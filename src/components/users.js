import { useQuery } from "@apollo/client";
import { Col, Image } from "react-bootstrap";
import { GET_USERS } from "../constants/graphql/queries";
import { useMessageState, useMessageDispatch } from "../context/message";

const Users = ({ setSelectedUser }) => {
  const dispatch = useMessageDispatch();

  const { users } = useMessageState();

  const { loading } = useQuery(GET_USERS, {
    onCompleted(data) {
      dispatch({
        type: "SET_USERS",
        payload: data.getUsers,
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <Col xs={4} className="p-0 bg-secondary">
      {!users || loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users have joined yet.</p>
      ) : users.length > 0 ? (
        users.map((user) => (
          <div
            className="d-flex p-3"
            key={user.username}
            onClick={() => setSelectedUser(user.username)}
          >
            <Image
              src={user.imageUrl}
              roundedCircle
              className="mr-2"
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
              }}
            />
            <div>
              <p className="text-success">{user.username}</p>
              <p className="font-weight-light">
                {user.latestMessage
                  ? user.latestMessage.content
                  : "You are now connected"}
              </p>
            </div>
          </div>
        ))
      ) : null}
    </Col>
  );
};

export default Users;
