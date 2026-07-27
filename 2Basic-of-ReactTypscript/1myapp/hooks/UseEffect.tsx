import { useEffect, useState } from "react";

type UserInfoType = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
};

type ApiResponse = {
  users: UserInfoType[];
  total: number;
  skip: number;
  limit: number;
};

function UseEffect() {
  const [users, setUsers] = useState<UserInfoType[] | null>(null);

  useEffect(() => {
    let isCancelled = false;

    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((result: ApiResponse) => {
        if (!isCancelled) setUsers(result.users);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <h1>Use Effect</h1>
      {users?.map((user) => (
        <div key={user.id}>
          <p>{user.username}</p>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <p>{user.age}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  );
}

export default UseEffect;
