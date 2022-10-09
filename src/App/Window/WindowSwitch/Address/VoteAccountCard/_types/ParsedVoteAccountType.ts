import {
  array,
  enums,
  Infer,
  nullable,
  number,
  string,
  type,
} from 'superstruct';

type VoteAccountType = Infer<typeof VoteAccountType>;
const VoteAccountType = enums(['vote']);

type AuthorizedVoter = Infer<typeof AuthorizedVoter>;
const AuthorizedVoter = type({
  authorizedVoter: string(),
  epoch: number(),
});

type PriorVoter = Infer<typeof PriorVoter>;
const PriorVoter = type({
  authorizedPubkey: string(),
  epochOfLastAuthorizedSwitch: number(),
  targetEpoch: number(),
});

type EpochCredits = Infer<typeof EpochCredits>;
const EpochCredits = type({
  epoch: number(),
  credits: string(),
  previousCredits: string(),
});

type Vote = Infer<typeof Vote>;
const Vote = type({
  slot: number(),
  confirmationCount: number(),
});

type VoteAccountInfo = Infer<typeof VoteAccountInfo>;
const VoteAccountInfo = type({
  authorizedVoters: array(AuthorizedVoter),
  authorizedWithdrawer: string(),
  commission: number(),
  epochCredits: array(EpochCredits),
  lastTimestamp: type({
    slot: number(),
    timestamp: number(),
  }),
  nodePubkey: string(),
  priorVoters: array(PriorVoter),
  rootSlot: nullable(number()),
  votes: array(Vote),
});

type ParsedVoteAccountType = Infer<typeof ParsedVoteAccountType>;
const ParsedVoteAccountType = type({
  type: VoteAccountType,
  info: VoteAccountInfo,
});

export default ParsedVoteAccountType;
