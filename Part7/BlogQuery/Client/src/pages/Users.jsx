import { useContext } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { BlogContext } from "../BlogAppContext";
import PageWrapper from "../Components/PageWrapper";
import { useQuery } from "@tanstack/react-query";
import { getAllusers } from "../Helpers/UsersHelper";

export default function Users() {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["Users"],
    queryFn: getAllusers,
  });
  const { userInfo } = useContext(BlogContext).blogauth;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);
  //
  return (
    <div>
      <PageWrapper>
        {data && data.length > 0 && (
          <>
            <ul className="py-[2rem] flex flex-col gap-[2rem]">
              {data.map((user) => {
                return (
                  <li
                    key={user.username}
                    className="py-4 px-2 shadow-md rounded-md"
                  >
                    <Link
                      to={`/users/${user.id}`}
                      className="flex items-center justify-between"
                    >
                      <p className="font-semibold capitalize">{user.name}</p>
                      <p>Posts : {user.blogs.length}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </PageWrapper>
    </div>
  );
}
