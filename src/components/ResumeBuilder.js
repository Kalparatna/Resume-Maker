import React, { useState } from "react";
import Section from "./Section";
import "./formStyle.css"; 
import "./resumePreviewStyle.css"; // 

const ResumeBuilder = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // Helper functions for adding and removing items
  const handleAdd = (setter, newItem) => setter((prev) => [...prev, newItem]);
  const handleRemove = (setter, index) =>
    setter((prev) => prev.filter((_, i) => i !== index));

  // Handle updates for dynamic items
  const handleUpdate = (setter, index, key, value) => {
    setter((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    );
  };

  // Preview generator
  const generateResumePreview = () => {
    return (
      <div className="resume-preview">
        <div className="resume-header">
          <h1>{personalInfo.fullName}</h1>
          <p>{personalInfo.email} | {personalInfo.phone} | {personalInfo.location}</p>
        </div>

        <div className="resume-section">
          <h2>Professional Summary</h2>
          <p>{summary}</p>
        </div>

        <div className="resume-section">
          <h2>Work Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx}>
              <h3>{exp.companyName} - {exp.position}</h3>
              <p>{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="resume-section">
          <h2>Education</h2>
          {education.map((edu, idx) => (
            <div key={idx}>
              <h3>{edu.institution}</h3>
              <p>{edu.degree}</p>
              <p>{edu.year} | GPA: {edu.gpa}</p>
            </div>
          ))}
        </div>

        <div className="resume-section">
          <h2>Certifications</h2>
          {certifications.map((cert, idx) => (
            <div key={idx}>
              <h3>{cert.name}</h3>
              <p>{cert.organization} ({cert.year})</p>
            </div>
          ))}
        </div>

        <div className="resume-section">
          <h2>Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx}>
              <h3>{proj.name}</h3>
              <p>{proj.description}</p>
              <p><strong>Technologies:</strong> {proj.technologies}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="resume-builder">
      <div className="input-section">
      <Section
  title="Personal Information"
  fields={[
    { name: "Full Name", value: personalInfo.fullName, onChange: (e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value }) },
    { name: "Email", value: personalInfo.email, onChange: (e) => setPersonalInfo({ ...personalInfo, email: e.target.value }) },
    { name: "Phone", value: personalInfo.phone, onChange: (e) => setPersonalInfo({ ...personalInfo, phone: e.target.value }) },
    { name: "Location", value: personalInfo.location, onChange: (e) => setPersonalInfo({ ...personalInfo, location: e.target.value }) },
  ]}
  addButtonClass="add-btn" 
  removeButtonClass="remove-btn" 
/>


<Section
  title="Professional Summary"
  fields={[
    {
      name: "Summary",
      value: summary,
      onChange: (e) => setSummary(e.target.value),
      type: "textarea",
    },
  ]}
  addButtonClass="add-btn" 
  removeButtonClass="remove-btn" 
/>


<Section
  title="Work Experience"
  items={experience}
  onAdd={() =>
    handleAdd(setExperience, {
      companyName: "",
      position: "",
      duration: "",
      description: "",
    })
  }
  onRemove={(index) => handleRemove(setExperience, index)}
  onUpdate={(index, key, value) =>
    handleUpdate(setExperience, index, key, value)
  }
  addButtonClass="add-btn" 
  removeButtonClass="remove-btn" 
/>

<Section
  title="Education"
  items={education}
  onAdd={() =>
    handleAdd(setEducation, {
      institution: "",
      degree: "",
      year: "",
      gpa: "",
    })
  }
  onRemove={(index) => handleRemove(setEducation, index)}
  onUpdate={(index, key, value) =>
    handleUpdate(setEducation, index, key, value)
  }
  addButtonClass="add-btn" 
  removeButtonClass="remove-btn" 
/>

<Section
  title="Certifications"
  items={certifications}
  onAdd={() =>
    handleAdd(setCertifications, { name: "", organization: "", year: "" })
  }
  onRemove={(index) => handleRemove(setCertifications, index)}
  onUpdate={(index, key, value) =>
    handleUpdate(setCertifications, index, key, value)
  }
  addButtonClass="add-btn" 
  removeButtonClass="remove-btn" 
/>

<Section
  title="Projects"
  items={projects}
  onAdd={() =>
    handleAdd(setProjects, {
      name: "",
      description: "",
      technologies: "",
    })
  }
  onRemove={(index) => handleRemove(setProjects, index)}
  onUpdate={(index, key, value) =>
    handleUpdate(setProjects, index, key, value)
  }
  addButtonClass="add-btn" 
  removeButtonClass="remove-btn" 
/>


        <button
          className="print-btn"
          onClick={() => setIsPreviewVisible(true)} 
        >
          Generate Resume
        </button>
      </div>

      {isPreviewVisible && (
        <div className="preview-section">
          <h2>Resume Preview</h2>
          {generateResumePreview()}
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
