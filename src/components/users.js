import { useQuery } from "@apollo/client";
import { Col, Image } from "react-bootstrap";
import { GET_USERS } from "../constants/graphql/queries";

const Users = ({ setSelectedUser }) => {
  const { loading, data, error } = useQuery(GET_USERS);

  return (
    <Col xs={4} className="p-0 bg-secondary">
      {!data || loading ? (
        <p>Loading...</p>
      ) : data.getUsers.length === 0 ? (
        <p>No users have joined yet.</p>
      ) : data.getUsers.length > 0 ? (
        data.getUsers.map((user) => (
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
