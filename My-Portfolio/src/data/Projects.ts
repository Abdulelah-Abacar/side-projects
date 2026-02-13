import { CSSProperties } from "react";

export interface ProjectCardContent {
  projectName: string;
  projectPreviewLink: string;
  projectCodeLink: string;
  projectTools: string[];
  propBackground?: CSSProperties["background"];
}
export const projectsList: ProjectCardContent[] = [
  {
    projectName: "Chat App",
    projectPreviewLink: "#",
    projectCodeLink: "https://github.com/Abdulelah-Abacar/Hsoub-Chat-App",
    projectTools: ["React", "Node", "Socket"],
    propBackground: "linear-gradient(90deg, #12c2e9, #c471ed 50%, #f64f59)",
  },
  {
    projectName: "My Doctor",
    projectPreviewLink: "",
    projectCodeLink: "https://github.com/Abdulelah-Abacar/Hsoub-My-Doctor",
    projectTools: ["Next", "Node", "Redux"],
    propBackground: "linear-gradient(90deg, #333399, #ff00cc)",
  },
  {
    projectName: "English Learning App",
    projectPreviewLink: "#",
    projectCodeLink:
      "https://github.com/Abdulelah-Abacar/Hsoub-Language-Learning-App",
    projectTools: ["Next", "OpenAI API"],
    propBackground: "linear-gradient(90deg, #ffc3a0, #ffafbd)",
  },
  {
    projectName: "Social Media Platform",
    projectPreviewLink: "#",
    projectCodeLink: "https://github.com/Abdulelah-Abacar/Hsoub-Booking-App",
    projectTools: ["React", "Node", "MongoDB", "ReduxTank"],
    propBackground: "linear-gradient(90deg, #ff5f6d, #ffc371)",
  },
  {
    projectName: "Q/A Platform",
    projectPreviewLink: "#",
    projectCodeLink: "https://github.com/Abdulelah-Abacar/Hsoub-QA-App",
    projectTools: ["Next", "Node", "ReactTank"],
    propBackground: "linear-gradient(90deg, #12c2e9, #c471ed 50%, #f64f59)",
  },
];
