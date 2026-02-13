import { FunctionComponent } from "react";
import ProjectCard from "../ProjectCard";
import { projectsList } from "../../data/Projects";

const Works: FunctionComponent = () => {
  return (
    <div className={"w-11/12 max-w-[870px]"}>
      <div className="pb-5 grid gap-2">
        <h2 className="text-21xl">Works</h2>
        <p className="">
          A collection of some side projects that have shipped recently.
        </p>
      </div>
      <div>
        <div className="flex flex-row flex-wrap gap-4">
          {projectsList.map((project, i) => (
            <ProjectCard
              key={i}
              projectName={project.projectName}
              projectCodeLink={project.projectCodeLink}
              projectPreviewLink={project.projectPreviewLink}
              projectTools={project.projectTools}
              propBackground={project.propBackground}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
