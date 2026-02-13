import React from "react";
import { useParams, Link } from "react-router";
import Chip from "../components/ui/Chip";
import Divider from "../components/ui/Divider";
import { Button } from "../components/ui/Button";
import Header from "../components/sections/Header";

// Define interfaces for the data structure
interface HeroSection {
  title: string;
  categories: string[];
}

interface OverviewSection {
  previewImage1: string;
  previewImage2: string;
  description: string;
}

interface ProcessItem {
  title: string;
  description: string;
}

interface OutcomeStatus {
  score: string;
  label: string;
}

interface OutcomeSection {
  description: string;
  status: OutcomeStatus[];
}

interface Project {
  name: string;
  heroSection: HeroSection;
  overviewSection: OverviewSection;
  processSection: ProcessItem[];
  outcomeSection: OutcomeSection;
  gallerySection: string[];
}

interface CaseStudioProps {
  data: Project[];
}

const CaseStudio: React.FC<CaseStudioProps> = ({ data }) => {
  const { name } = useParams<{ name: string }>();

  const project = data.find((item) => item.name === name?.replace(/-/g, " "));
  const otherProjects = data
    .filter(
      (pro) =>
        pro.heroSection.categories[1] === project?.heroSection.categories[1]
    )
    .filter((item) => item.name !== name?.replace(/-/g, " "));

  if (!project) {
    return (
      <Header className="h-[95vh]">
        <div className="w-11/12 2xl:w-2/3 mx-auto flex flex-col gap-4 md:gap-8 items-start justify-center h-full">
          <h1 className="headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl w-full md:w-5/6">
            Look Like There Is No Project With This Name Go Home Page{" "}
            <Link to="/" className="text-Accent underline">
              Home
            </Link>
          </h1>
        </div>
      </Header>
    );
  }

  return (
    <div className="flex flex-col items-center bg-primary text-secondary">
      <Header className="h-[95vh]">
        <div className="w-11/12 2xl:w-2/3 mx-auto flex flex-col gap-4 md:gap-8 items-start justify-center h-full">
          <h1 className="headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl w-full md:w-5/6">
            {project.heroSection.title}
          </h1>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.heroSection.categories.map((cat) => (
              <Chip className="text-sm md:text-lg" text={cat} key={cat} />
            ))}
          </div>
        </div>
      </Header>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-12 md:gap-24 w-full">
        {/* Overview Section */}
        <section className="flex flex-col gap-8 md:gap-20 w-full">
          {/* Top Image - Touches Hero Section */}
          <div className="w-full border-y border-y-[#494747] border-y-solid">
            <img
              src={project.overviewSection.previewImage1}
              alt="Overview"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Overview Content */}
          <div className="w-11/12 mx-auto space-y-5 md:space-y-7">
            <h2 className="headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Overview
            </h2>
            <p className="paragraph text-sm sm:text-base md:text-lg">
              {project.overviewSection.description}
            </p>
          </div>

          {/* Bottom Image - Full Width */}
          <div className="w-full border-y border-y-[#494747] border-y-solid">
            <img
              src={project.overviewSection.previewImage2}
              alt="Overview"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>

        {/* Process Section */}
        <section className="w-11/12 mx-auto">
          <h2 className="headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-16">
            Process
          </h2>
          <div className="grid gap-8 md:gap-10">
            {project.processSection.map((item, index) => (
              <article key={index}>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  {item.title}
                </h3>
                <p
                  className="paragraph text-sm sm:text-base md:text-lg"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </article>
            ))}
          </div>
        </section>

        {/* Outcome Section */}
        <section className="w-11/12 mx-auto">
          <h2 className="headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-16">
            Outcome
          </h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-10">
            <p className="paragraph text-sm sm:text-base md:text-lg basis-1/2">
              {project.outcomeSection.description}
            </p>
            <Divider />
            <div className="flex flex-col basis-1/2 items-center justify-between gap-4">
              <div className="flex gap-4 justify-between items-center">
                {project.outcomeSection.status
                  .slice(0, 2)
                  .map((stat, index) => (
                    <div
                      key={index}
                      className="flex gap-4 flex-col items-center justify-center"
                    >
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#a5ff15]">
                        {stat.score}
                      </span>
                      <span className="text-sm sm:text-base md:text-lg text-[#afafaf]">
                        {stat.label}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="flex gap-4 items-center justify-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#a5ff15]">
                  {project.outcomeSection.status[2].score}
                </span>
                <span className="text-sm sm:text-base md:text-lg text-[#afafaf]">
                  {project.outcomeSection.status[2].label}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="w-11/12 mx-auto flex flex-col gap-8 md:gap-10 items-center justify-center">
          <div className="w-full">
            <h2 className="headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-16">
              {project.name} Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallerySection.slice(0, 2).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="rounded-lg w-full h-auto"
                />
              ))}
              <img
                src={project.gallerySection[2]}
                alt="Gallery 3"
                className="rounded-lg w-full h-auto md:col-span-2 aspect-[2/1] object-fill"
              />
            </div>
          </div>
          <Button
            text={`Start your ${project.heroSection.categories[1]} project today`}
            href="/#contact-us"
          />
        </section>

        {/* Our Other Work Section */}
        <section className="w-11/12 mx-auto">
          <h2 className="headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-16">
            Our Other {project.heroSection.categories[1]} Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherProjects.map((proj) => (
              <ProjectCard key={proj.name} project={proj} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Separate component for Project Card
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <Link
    to={`/projects/${project.name.replace(/ /g, "-")}`}
    className="relative group block overflow-hidden rounded-lg"
  >
    <img
      src={project.overviewSection.previewImage1}
      alt={project.name}
      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
    <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-white text-lg sm:text-xl font-bold hover:underline">
        {project.name}
      </span>
      <p className="text-white text-xs sm:text-sm mt-2">
        {project.heroSection.title}
      </p>
    </div>
  </Link>
);

export default CaseStudio;
