import avatar from "../../assets/avatar.png";

function Avatar() {
  return (
    <div className="w-40 h-40 rounded-full bg-dimgray-100 dark:bg-green-50 overflow-hidden flex items-center justify-center border-[5px] border-solid border-whitesmoke dark:border-darkslategray -translate-y-1/2 translate-x-10">
      <img
        className="w-[120px] h-[160px] object-cover"
        loading="lazy"
        alt="Avatar"
        src={avatar}
      />
    </div>
  );
}

export default Avatar;
