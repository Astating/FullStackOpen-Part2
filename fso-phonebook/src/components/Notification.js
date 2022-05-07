const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  let className = message.includes("ERROR") ? "error" : "success";

  return <p className={className}>{message}</p>;
};

export default Notification