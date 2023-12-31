import { CreateProfile } from "src/features/profiles/components/create";
import { EditProfile } from "src/features/profiles/components/edit";
import { ProfilePage } from "src/features/profiles/components/page";
import { useProfile } from "src/features/profiles/hooks/useProfile";
import { ProfilePageProps } from "src/libs/next/page";

export const Profile = (props: ProfilePageProps) => {
  const { type } = useProfile();

  return type === "create" ? (
    <CreateProfile />
  ) : type === "edit" ? (
    <EditProfile {...props} />
  ) : (
    <ProfilePage {...props} />
  );
};
