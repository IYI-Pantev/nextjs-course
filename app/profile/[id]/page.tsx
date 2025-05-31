const UserProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col items-center justify-center  py-2">
      <h1 className="text-2xl text-white mb-2">
        {" "}
        <span className="p-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>{" "}
        Profile Page
      </h1>
      <hr />
      <p className="text-white">Welcome to your profile!</p>
    </div>
  );
};

export default UserProfilePage;
