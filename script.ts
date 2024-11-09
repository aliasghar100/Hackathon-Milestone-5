// Import jsPDF from the UMD module on the window object
const { jsPDF } = window.jspdf;

// Function to add new education input fields
function addEducation() {
  const educationSection = document.getElementById("education-section") as HTMLDivElement;
  const newEducationField = document.createElement("div");

  newEducationField.innerHTML = `
      <input type="text" placeholder="Degree" required>
      <input type="text" placeholder="Institution" required>
      <input type="text" placeholder="Graduation Year" required>
  `;

  educationSection.appendChild(newEducationField);
}

// Function to add new work experience input fields
function addExperience() {
  const experienceSection = document.getElementById("experience-section") as HTMLDivElement;
  const newExperienceField = document.createElement("div");

  newExperienceField.innerHTML = `
      <input type="text" placeholder="Job Title" required>
      <input type="text" placeholder="Company" required>
      <input type="text" placeholder="Duration" required>
  `;

  experienceSection.appendChild(newExperienceField);
}

// Function to generate the resume content
function generateResume() {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",").map(skill => skill.trim()).join(", ");
  
  let educationHTML = "<h3>Education</h3><ul>";
  const educationInputs = document.querySelectorAll("#education-section input");
  for (let i = 0; i < educationInputs.length; i += 3) {
      educationHTML += `
          <li><strong>Degree:</strong> ${(educationInputs[i] as HTMLInputElement).value}</li>
          <li><strong>Institution:</strong> ${(educationInputs[i+1] as HTMLInputElement).value}</li>
          <li><strong>Graduation Year:</strong> ${(educationInputs[i+2] as HTMLInputElement).value}</li>
      `;
  }
  educationHTML += "</ul>";

  let experienceHTML = "<h3>Work Experience</h3><ul>";
  const experienceInputs = document.querySelectorAll("#experience-section input");
  for (let i = 0; i < experienceInputs.length; i += 3) {
      experienceHTML += `
          <li><strong>Job Title:</strong> ${(experienceInputs[i] as HTMLInputElement).value}</li>
          <li><strong>Company:</strong> ${(experienceInputs[i+1] as HTMLInputElement).value}</li>
          <li><strong>Duration:</strong> ${(experienceInputs[i+2] as HTMLInputElement).value}</li>
      `;
  }
  experienceHTML += "</ul>";

  const resumeDisplay = document.getElementById("resume-content") as HTMLDivElement;
  resumeDisplay.innerHTML = `
      <h2>${name || "Your Name"}</h2>
      <p><strong>Email:</strong> ${email || "your.email@example.com"}</p>
      <h3>Skills</h3>
      <p>${skills || "Your skills here"}</p>
      ${educationHTML}
      ${experienceHTML}
  `;

  // Show the resume display
  const resumeSection = document.getElementById("resume-display") as HTMLDivElement;
  resumeSection.style.display = "block";
}

// Function to download the resume as PDF
function downloadPDF() {
  const doc = new jsPDF();
  doc.text((document.getElementById("resume-content") as HTMLDivElement).innerText, 10, 10);
  doc.save("resume.pdf");
}

// Event listeners
document.getElementById("add-education")?.addEventListener("click", addEducation);
document.getElementById("add-experience")?.addEventListener("click", addExperience);
document.getElementById("generate-resume")?.addEventListener("click", generateResume);
document.getElementById("download-pdf")?.addEventListener("click", downloadPDF);
