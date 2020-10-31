import classNames from "classnames";
import { useAuthState } from "../context/auth";

const Message = ({ message }) => {
  const { user } = useAuthState();
  const sent = message.from === user.username;
  const received = !sent;

  return (
    <div
      className={classNames("d-flex my-3", {
        "ml-auto": sent,
        "mr-auto": received,
      })}
    >
      <div
        className={classNames("py-2 px-3 rounded-pill", {
          "bg-primary": sent,
          "bg-secondary": received,
        })}
      >
        <p
          className={classNames({
            "text-white": sent,
          })}
        >
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default Message;
