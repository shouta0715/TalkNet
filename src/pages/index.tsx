import { BasicLayout } from "src/components/layouts/BasicLayout";
import { Top } from "src/features/pages/top";
import { getMoods } from "src/handlers/moods";
import { getProfile } from "src/handlers/profiles/get";
import { getTopics } from "src/handlers/topics/get";
import { Meta } from "src/libs/meta";

import {
  NextPageWithLayout,
  TopPage,
  TopPageProps,
  withSessionPage,
} from "src/libs/next/page";

const Page: NextPageWithLayout<TopPage> = (props) => {
  return <Top {...props} />;
};

Page.getLayout = (page, props) => BasicLayout(page, props);
Page.getTitle = Meta(() => "TalkNet");

export const getServerSideProps = withSessionPage<TopPageProps>(
  async ({ user }) => {
    const [profile, topics, moods] = await Promise.all([
      getProfile(user?.id),
      getTopics(),
      getMoods(),
    ]);

    return {
      user,
      profile,
      topics,
      moods,
    };
  }
);
export default Page;
