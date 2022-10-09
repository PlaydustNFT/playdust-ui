import { Infer, object, optional, string } from 'superstruct';

type PlaydustProfileType = Infer<typeof PlaydustProfileType>;
const PlaydustProfileType = object({
  username: string(),
  email: string(),
  bio: string(),
  discordUsername: string(),
  twitterUsername: string(),
  profilePictureMintAddress: string(),
  profilePictureImage: optional(string()),
});

export default PlaydustProfileType;
