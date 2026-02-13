import { useCallback, useState } from "react";
import { Button } from "../ui/Button";
import Chip from "../ui/Chip";
import { motion, Variants } from "framer-motion";
import { ContactUsProps } from "../../types";

const apiUrl = import.meta.env.VITE_API_URL;

// Animation Variants
const fadeInVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child's animation
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ContactUs({
  chip,
  title,
  description,
  contactMethods,
  form,
}: ContactUsProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  }, []);

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Handle file input change
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);
    files.forEach((file) => formDataToSend.append("files", file));

    try {
      const response = await fetch(`${apiUrl}/api/email/send-email`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Email sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setFiles([]);
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-us"
      className="w-11/12 grid grid-cols-1 md:grid-cols-2 items-start gap-10"
    >
      {/* Left Side */}
      <motion.div
        className="flex flex-col gap-24 justify-center items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        <div className="flex flex-col gap-8 items-start">
          <Chip text={chip} />
          <motion.h1
            className="headline !text-3xl md:!text-4xl lg:!text-5xl"
            dangerouslySetInnerHTML={{ __html: title }}
            variants={fadeInVariants}
          />

          <motion.p
            className="paragraph text-lg md:text-xl lg:text-2xl"
            variants={fadeInVariants}
          >
            {description}
          </motion.p>

          {/* Contact Methods with Sequential Animation */}
          <motion.div
            className="flex flex-col gap-10 items-start mt-10"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className="w-full"
                variants={childVariants}
              >
                <div className="flex gap-5 items-center">
                  <img src={method.icon} alt={method.text} />
                  <p className="paragraph">{method.text}</p>
                </div>
                {/* Divider */}
                {index < contactMethods.length - 1 && (
                  <div className="w-60 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#8BD612] to-transparent my-4" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="flex flex-col gap-24 justify-center items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInRightVariants}
      >
        <form
          onSubmit={handleSubmit}
          className="flex w-full p-4 md:p-8 flex-col gap-11 justify-center items-start bg-[url(./assets/MainBG.png)] bg-cover bg-no-repeat rounded-2xl border-[#494747] border-[0.03rem]"
        >
          <div className="flex flex-col items-center justify-center w-full space-y-4">
            <motion.h4
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase"
              variants={fadeInRightVariants}
            >
              {form.title}
            </motion.h4>
            <motion.p
              className="text-lg font-light text-center"
              variants={fadeInRightVariants}
            >
              {form.description}
            </motion.p>
          </div>

          {/* Input Fields with Sequential Animation */}
          <motion.div
            className="w-full space-y-4"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              placeholder={form.namePlaceholder}
              className="outline-none py-3 px-4 border border-[#494747] rounded-2xl w-full text-[#494747] block bg-transparent"
              variants={childVariants}
              onChange={handleInputChange}
              required
            />
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              placeholder={form.emailPlaceholder}
              className="outline-none py-3 px-4 border border-[#494747] rounded-2xl w-full text-[#494747] block bg-transparent"
              variants={childVariants}
              onChange={handleInputChange}
              required
            />
            <motion.input
              type="text"
              name="subject"
              value={formData.subject}
              placeholder={form.subjectPlaceholder}
              className="outline-none py-3 px-4 border border-[#494747] rounded-2xl w-full text-[#494747] block bg-transparent"
              variants={childVariants}
              onChange={handleInputChange}
              required
            />
            <motion.textarea
              name="message"
              value={formData.message}
              placeholder={form.messagePlaceholder}
              rows={8}
              className="outline-none resize-none py-3 px-4 border border-[#494747] rounded-2xl w-full text-[#494747] block bg-transparent"
              variants={childVariants}
              onChange={handleInputChange}
              required
            />
          </motion.div>

          {/* File Upload Section */}
          <div className="flex flex-col md:flex-row items-start gap-5">
            {/* File Upload Box */}
            <motion.div
              className={`border-2 border-dashed ${
                isDragging ? "border-Accent" : "border-secondary/50"
              } rounded-lg py-4 px-2.5 text-center transition-all duration-300 ease-in-out`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              variants={fadeInRightVariants}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                {/* Upload Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-secondary/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                {/* Drag & Drop Text */}
                <p className="text-gray-600">Drag & Drop Your File Here</p>
                {/* Or Text */}
                <p className="text-gray-500">Or</p>
                {/* Browse Button */}
                <label className="cursor-pointer text-sm px-6 py-1.5 border border-secondary rounded-full transition-all duration-300 ease-in-out">
                  Browse
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileInput}
                    multiple
                  />
                </label>
              </div>

              {/* Display Uploaded Files Inside the Box */}
              {files.length > 0 && (
                <div className="mt-4">
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between text-sm text-secondary"
                      >
                        <span>
                          {file.name.slice(0, 20)} -{" "}
                          {(file.size / 1024).toFixed(2)} KB
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 border border-red-700 rounded-full ml-2 px-2 rotate-45 text-xl"
                        >
                          +
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* File Information */}
            <motion.div className="flex-1" variants={fadeInRightVariants}>
              <h3 className="text-lg font-semibold text-secondary/20">
                Upload Your Project Files If Needed
              </h3>
              <p className="text-sm text-secondary/40 mt-2">
                Supported file types: PDF, DOC, PNG, JPG (Max size: 5MB)
              </p>
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div variants={fadeInRightVariants}>
            <Button
              type="submit"
              text={isSubmitting ? "sending massage..." : form.cta}
              disabled={isSubmitting}
            />
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
}

export default ContactUs;
