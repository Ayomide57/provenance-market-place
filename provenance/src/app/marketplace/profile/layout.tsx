import UserSideBar from "@/components/UserSideBar";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-black p-20">
      <UserSideBar />
      <div style={{ width: "-webkit-fill-available" }}>{children}</div>
    </div>
  );
}

export default ProfileLayout;
