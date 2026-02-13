import { FunctionComponent } from "react";
import { GithubIcon, PreviewIcon } from "../../assets/icons";
import { ProjectCardContent } from "../../data/Projects";

const ProjectCard: FunctionComponent<ProjectCardContent> = ({
  projectName,
  projectCodeLink,
  projectPreviewLink,
  projectTools,
  propBackground,
}) => {
  const hoverStyle =
    "hover:!bg-none hover:border-darkslategray dark:hover:border-whitesmoke hover:text-darkslategray dark:hover:text-whitesmoke";
  return (
    <div
      className={`min-w-[330px] max-w-full grid flex-1 gap-5 text-center text-21xl text-whitesmoke rounded-8xs p-5 select-none duration-500 border-solid border dark:border-darkslategray ${hoverStyle}`}
      style={{
        background: propBackground,
      }}
    >
      <div className="flex items-center justify-end gap-[24px]">
        <a href={projectCodeLink} className="flex text-inherit" target="_blank">
          <GithubIcon color={"currentColor"} />
        </a>
        <a
          href={projectPreviewLink}
          className="flex text-inherit"
          target="_blank"
        >
          <PreviewIcon color={"currentColor"} />
        </a>
      </div>
      <b className="self-stretch leading-[158%] font-extrabold mq450:text-5xl mq450:leading-[38px] mq1025:text-13xl mq1025:leading-[51px]">
        {projectName}
      </b>
      <div className="w-full flex flex-wrap items-center justify-center gap-2 gap-y-0 text-xl">
        {projectTools?.map((tool, i) => (
          <span key={i}>{tool}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
