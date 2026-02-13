import { motion } from "framer-motion";
type Props = {
  children: React.ReactNode;
};

function FadeIn({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "100% 0px -300px 0px" }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
