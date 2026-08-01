# AI Resume Analyzer & ATS Optimizer

A lightweight ATS (Applicant Tracking System) Resume Analyzer built with **Python (Flask)** and **Vanilla JavaScript**. Upload your resume in **PDF** or **TXT** format and get an instant ATS score, detected skills, predicted job role, missing skills, and actionable improvement tips.

---

## 🚀 Features

* 📄 Upload Resume (.pdf or .txt)
* ⚡ One-click Resume Analysis
* 📊 ATS Score Calculation
* 💼 Automatic Job Role Prediction
* 🛠️ Skill Detection
* ❌ Missing Skills Identification
* 💡 Resume Improvement Suggestions
* 🎯 Clean & Minimal User Interface
* 🔥 Fast Flask Backend
* 🌐 Pure HTML, CSS, and JavaScript (No React)

---

## 🖼️ Home
<img width="1062" height="629" alt="Screenshot 2026-08-02 000629" src="https://github.com/user-attachments/assets/b13f3506-3e6f-48c9-ba3f-676507f8e8ca" />
## 🖼️ Demo
<img width="1011" height="887" alt="Screenshot 2026-08-01 235812" src="https://github.com/user-attachments/assets/38e95f67-b525-4803-8eb3-ca70f68b9caa" />

---

## 📁 Project Structure

```
AI-Resume-Analyzer/
│
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

## 🛠️ Tech Stack

### Backend

* Python 3
* Flask
* PyPDF
* Regular Expressions (Regex)

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/mohammedghoused/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### 2. Create Virtual Environment (Recommended)

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**Linux / macOS**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 4. Start Flask Server

```bash
python app.py
```

The backend will run at:

```
http://127.0.0.1:5000
```

### 5. Open the Frontend

Open:

```
frontend/index.html
```

in your browser.

---

## 📌 How It Works

1. Upload a Resume (.pdf or .txt)
2. Click **Analyze Resume**
3. The application:

   * Extracts resume text
   * Detects technical and soft skills
   * Calculates an ATS score
   * Predicts the most suitable job role
   * Identifies missing skills
   * Generates resume improvement tips
4. Results are displayed instantly.

---

## 📊 JSON Response

```json
{
  "ats_score": 82,
  "detected_role": "Backend Developer",
  "skills_found": [
    "Python",
    "Flask",
    "SQL"
  ],
  "missing_skills": [
    "Docker",
    "AWS"
  ],
  "resume_strength": "Strong backend-focused resume with relevant technical skills.",
  "improvement_tips": [
    "Add measurable achievements.",
    "Include cloud technologies.",
    "Highlight impactful projects."
  ]
}
```

---

## 📄 Supported File Types

* PDF (.pdf)
* Text (.txt)

---

## 🎯 Future Improvements

* DOCX Resume Support
* Resume Section Analysis
* Contact Information Extraction
* Resume Formatting Suggestions
* Advanced ATS Keyword Matching
* Resume Download Report
* Multi-language Resume Support

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Mohammed Ghouse**

GitHub: https://github.com/mohammedghoused
