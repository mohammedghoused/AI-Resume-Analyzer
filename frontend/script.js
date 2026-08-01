document.addEventListener("DOMContentLoaded", () => {
  const analyzerForm = document.getElementById("analyzerForm");
  const resumeInput = document.getElementById("resume");
  const fileDropArea = document.getElementById("fileDropArea");
  const fileSelectedInfo = document.getElementById("fileSelectedInfo");
  const selectedFileName = document.getElementById("selectedFileName");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");

  const uploadSection = document.getElementById("uploadSection");
  const resultsSection = document.getElementById("resultsSection");
  const resetBtn = document.getElementById("resetBtn");

  // Output Elements
  const predictedRole = document.getElementById("predictedRole");
  const detectedRoleBadge = document.getElementById("detectedRoleBadge");
  const scoreValue = document.getElementById("scoreValue");
  const strengthValue = document.getElementById("strengthValue");
  const progressFill = document.getElementById("progressFill");
  const recommendationText = document.getElementById("recommendationText");

  const strengthsList = document.getElementById("strengthsList");
  const weaknessesList = document.getElementById("weaknessesList");
  const targetRoleName = document.getElementById("targetRoleName");
  const missingSkillsTags = document.getElementById("missingSkillsTags");
  const tipsList = document.getElementById("tipsList");
  const skillsCategoryContainer = document.getElementById("skillsCategoryContainer");

  const extractedSummary = document.getElementById("extractedSummary");
  const extractedExperience = document.getElementById("extractedExperience");
  const extractedProjects = document.getElementById("extractedProjects");
  const extractedEducation = document.getElementById("extractedEducation");

  // Endpoint helper
  const getApiEndpoint = () => {
    if (window.location.protocol === "file:") {
      return "http://localhost:3000/analyze";
    }
    return "/analyze";
  };

  // Drag and Drop
  ["dragenter", "dragover"].forEach(eventName => {
    fileDropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileDropArea.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach(eventName => {
    fileDropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileDropArea.classList.remove("dragover");
    });
  });

  fileDropArea.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      resumeInput.files = files;
      updateFileSelectionUI(files[0]);
    }
  });

  resumeInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      updateFileSelectionUI(e.target.files[0]);
    }
  });

  function updateFileSelectionUI(file) {
    if (file) {
      selectedFileName.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      fileSelectedInfo.classList.remove("hidden");
    } else {
      fileSelectedInfo.classList.add("hidden");
    }
  }

  // Form Submission
  analyzerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = resumeInput.files[0];
    if (!file) {
      alert("Please select a valid resume file (.pdf, .docx, or .txt) to analyze.");
      return;
    }

    const filename = file.name.toLowerCase();
    if (!filename.endsWith(".pdf") && !filename.endsWith(".docx") && !filename.endsWith(".txt")) {
      alert("Unsupported file format. Please upload a .pdf, .docx, or .txt file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoadingState(true);

    try {
      const response = await fetch(getApiEndpoint(), {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg = (data && data.error) ? data.error : "Failed to analyze resume.";
        throw new Error(errorMsg);
      }

      if (!data) {
        throw new Error("Received empty response from server.");
      }

      renderResults(data);

    } catch (err) {
      alert(err.message || "An unexpected error occurred during resume analysis.");
    } finally {
      setLoadingState(false);
    }
  });

  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.textContent = "Analyzing Resume...";
      btnSpinner.classList.remove("hidden");
    } else {
      submitBtn.disabled = false;
      btnText.textContent = "Analyze Resume";
      btnSpinner.classList.add("hidden");
    }
  }

  // Render Results
  function renderResults(data) {
    uploadSection.classList.add("hidden");
    resultsSection.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Header info
    predictedRole.textContent = data.role || "Software Engineer";
    detectedRoleBadge.textContent = "Detected Target Role";
    targetRoleName.textContent = data.role || "target role";

    const score = data.ats_score ?? 0;
    scoreValue.textContent = `${score}%`;
    progressFill.style.width = `${score}%`;

    let strengthLabel = "Needs Optimization";
    if (score >= 80) strengthLabel = "Exceptional Fit";
    else if (score >= 60) strengthLabel = "Competitive Match";
    else if (score >= 40) strengthLabel = "Moderate Alignment";

    strengthValue.textContent = strengthLabel;
    recommendationText.textContent = data.recommendation || "";

    // Strengths
    strengthsList.innerHTML = "";
    if (data.strengths && data.strengths.length > 0) {
      data.strengths.forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        strengthsList.appendChild(li);
      });
    } else {
      strengthsList.innerHTML = "<li>No specific strengths highlighted.</li>";
    }

    // Weaknesses
    weaknessesList.innerHTML = "";
    if (data.weaknesses && data.weaknesses.length > 0) {
      data.weaknesses.forEach(w => {
        const li = document.createElement("li");
        li.textContent = w;
        weaknessesList.appendChild(li);
      });
    } else {
      weaknessesList.innerHTML = "<li>No major critical weaknesses flagged.</li>";
    }

    // Missing Skills Tags
    missingSkillsTags.innerHTML = "";
    if (data.missing_skills && data.missing_skills.length > 0) {
      data.missing_skills.forEach(skill => {
        const span = document.createElement("span");
        span.className = "tag missing";
        span.textContent = skill;
        missingSkillsTags.appendChild(span);
      });
    } else {
      missingSkillsTags.innerHTML = '<span class="tag found">All Core Role Skills Matched!</span>';
    }

    // Tips List
    tipsList.innerHTML = "";
    if (data.tips && data.tips.length > 0) {
      data.tips.forEach(tip => {
        const li = document.createElement("li");
        li.textContent = tip;
        tipsList.appendChild(li);
      });
    } else {
      tipsList.innerHTML = "<li>Your resume is well aligned with ATS expectations.</li>";
    }

    // Skill Categories
    skillsCategoryContainer.innerHTML = "";
    const categoryTitles = {
      programming_languages: "Programming Languages",
      frameworks: "Frameworks & Libraries",
      databases: "Databases",
      cloud_and_devops: "Cloud & DevOps",
      tools_and_libraries: "Tools & Utilities",
      ai_tools: "AI & ML Frameworks",
      soft_skills: "Soft Skills & Process"
    };

    let totalDetectedSkills = 0;
    if (data.skill_categories) {
      Object.entries(data.skill_categories).forEach(([catKey, skillsArr]) => {
        if (skillsArr && skillsArr.length > 0) {
          totalDetectedSkills += skillsArr.length;
          const block = document.createElement("div");
          block.className = "category-block";

          const title = document.createElement("h4");
          title.textContent = categoryTitles[catKey] || catKey.replace("_", " ");
          block.appendChild(title);

          const tagsDiv = document.createElement("div");
          tagsDiv.className = "tags-container";
          skillsArr.forEach(sk => {
            const span = document.createElement("span");
            span.className = "tag found";
            span.textContent = sk;
            tagsDiv.appendChild(span);
          });

          block.appendChild(tagsDiv);
          skillsCategoryContainer.appendChild(block);
        }
      });
    }

    if (totalDetectedSkills === 0) {
      skillsCategoryContainer.innerHTML = '<p class="section-desc">No recognized technical skills detected in the document.</p>';
    }

    // Extracted Sections
    extractedSummary.textContent = data.summary || "No clear summary section detected.";

    renderContentList(extractedExperience, data.experience, "No experience items extracted.");
    renderContentList(extractedProjects, data.projects, "No project items extracted.");
    renderContentList(extractedEducation, data.education, "No education credentials extracted.");
  }

  function renderContentList(container, itemsArr, emptyMsg) {
    container.innerHTML = "";
    if (itemsArr && itemsArr.length > 0) {
      itemsArr.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        container.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = emptyMsg;
      container.appendChild(li);
    }
  }

  // Reset Button
  resetBtn.addEventListener("click", () => {
    analyzerForm.reset();
    fileSelectedInfo.classList.add("hidden");
    resultsSection.classList.add("hidden");
    uploadSection.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
