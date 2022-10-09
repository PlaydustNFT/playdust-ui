import {
  any,
  array,
  boolean,
  enums,
  Infer,
  nullable,
  number,
  record,
  string,
  type,
} from 'superstruct';

const PLATFORMS = enums(['ethereum', 'tron']);

type ReposURL = Infer<typeof ReposURL>;
const ReposURL = type({
  github: nullable(array(string())),
  bitbucket: nullable(array(any())),
});

type Links = Infer<typeof Links>;
const Links = type({
  homepage: nullable(array(string())),
  blockchain_site: nullable(array(string())),
  official_forum_url: nullable(array(string())),
  chat_url: nullable(array(string())),
  announcement_url: nullable(array(string())),
  twitter_screen_name: nullable(string()),
  facebook_username: nullable(string()),
  bitcointalk_thread_identifier: nullable(number()),
  telegram_channel_identifier: nullable(string()),
  subreddit_url: nullable(string()),
  repos_url: nullable(ReposURL),
});

type PublicInterestStats = Infer<typeof PublicInterestStats>;
const PublicInterestStats = type({
  alexa_rank: nullable(number()),
  bing_matches: nullable(any()),
});

type Image = Infer<typeof Image>;
const Image = type({
  thumb: nullable(string()),
  small: nullable(string()),
  large: nullable(string()),
});

type MarketData = Infer<typeof MarketData>;
const MarketData = type({
  current_price: nullable(record(string(), number())),
  ath: nullable(record(string(), number())),
  ath_change_percentage: nullable(record(string(), number())),
  ath_date: nullable(record(string(), string())),
  atl: nullable(record(string(), number())),
  atl_change_percentage: nullable(record(string(), number())),
  atl_date: nullable(record(string(), string())),
  market_cap: nullable(record(string(), number())),
  market_cap_rank: nullable(number()),
  fully_diluted_valuation: nullable(any()),
  total_volume: nullable(record(string(), number())),
  high_24h: nullable(record(string(), number())),
  low_24h: nullable(record(string(), number())),
  price_change_24h: nullable(number()),
  price_change_percentage_24h: nullable(number()),
  price_change_percentage_7d: nullable(number()),
  price_change_percentage_14d: nullable(number()),
  price_change_percentage_30d: nullable(number()),
  price_change_percentage_60d: nullable(number()),
  price_change_percentage_200d: nullable(number()),
  price_change_percentage_1y: nullable(number()),
  market_cap_change_24h: nullable(number()),
  market_cap_change_percentage_24h: nullable(number()),
  price_change_24h_in_currency: nullable(record(string(), number())),
  price_change_percentage_1h_in_currency: nullable(record(string(), number())),
  price_change_percentage_24h_in_currency: nullable(record(string(), number())),
  price_change_percentage_7d_in_currency: nullable(record(string(), number())),
  price_change_percentage_14d_in_currency: nullable(record(string(), number())),
  price_change_percentage_30d_in_currency: nullable(record(string(), number())),
  price_change_percentage_60d_in_currency: nullable(record(string(), number())),
  price_change_percentage_200d_in_currency: nullable(
    record(string(), number())
  ),
  price_change_percentage_1y_in_currency: nullable(record(string(), number())),
  market_cap_change_24h_in_currency: nullable(record(string(), number())),
  market_cap_change_percentage_24h_in_currency: nullable(
    record(string(), number())
  ),
  total_supply: nullable(number()),
  max_supply: nullable(number()),
  circulating_supply: nullable(number()),
  last_updated: nullable(string()),
});

type CommunityData = Infer<typeof CommunityData>;
const CommunityData = type({
  twitter_followers: nullable(number()),
  reddit_average_posts_48h: nullable(number()),
  reddit_average_comments_48h: nullable(number()),
  reddit_subscribers: nullable(number()),
  reddit_accounts_active_48h: nullable(number()),
  telegram_channel_user_count: nullable(number()),
});

type CodeAdditionsDeletions4Weeks = Infer<typeof CodeAdditionsDeletions4Weeks>;
const CodeAdditionsDeletions4Weeks = type({
  additions: nullable(number()),
  deletions: nullable(number()),
});

type DeveloperData = Infer<typeof DeveloperData>;
const DeveloperData = type({
  forks: nullable(number()),
  stars: nullable(number()),
  subscribers: nullable(number()),
  total_issues: nullable(number()),
  closed_issues: nullable(number()),
  pull_requests_merged: nullable(number()),
  pull_request_contributors: nullable(number()),
  code_additions_deletions_4_weeks: nullable(CodeAdditionsDeletions4Weeks),
  commit_count_4_weeks: nullable(number()),
  last_4_weeks_commit_activity_series: nullable(array(number())),
});

type Market = Infer<typeof Market>;
const Market = type({
  name: nullable(string()),
  identifier: nullable(string()),
  has_trading_incentive: nullable(boolean()),
});

type Ticker = Infer<typeof Ticker>;
const Ticker = type({
  base: nullable(string()),
  target: nullable(string()),
  market: nullable(Market),
  last: nullable(number()),
  volume: nullable(number()),
  converted_last: nullable(record(string(), number())),
  converted_volume: nullable(record(string(), number())),
  trust_score: nullable(string()),
  bid_ask_spread_percentage: nullable(number()),
  timestamp: nullable(string()),
  last_traded_at: nullable(string()),
  last_fetch_at: nullable(string()),
  is_anomaly: nullable(boolean()),
  is_stale: nullable(boolean()),
  trade_url: nullable(string()),
  token_info_url: nullable(string()),
  coin_id: nullable(string()),
});

type CoinFullInfoType = Infer<typeof CoinFullInfoType>;
const CoinFullInfoType = type({
  id: nullable(string()),
  symbol: nullable(string()),
  name: nullable(string()),
  asset_platform_id: nullable(string()),
  platforms: nullable(record(string(), string())),
  block_time_in_minutes: nullable(number()),
  hashing_algorithm: nullable(string()),
  categories: nullable(array(nullable(string()))),
  public_notice: nullable(string()),
  additional_notices: nullable(array(any())),
  localization: nullable(record(string(), string())),
  description: nullable(record(string(), string())),
  links: nullable(Links),
  image: nullable(Image),
  country_origin: nullable(string()),
  sentiment_votes_up_percentage: nullable(number()),
  sentiment_votes_down_percentage: nullable(number()),
  market_cap_rank: nullable(number()),
  coingecko_rank: nullable(number()),
  coingecko_score: nullable(number()),
  developer_score: nullable(number()),
  community_score: nullable(number()),
  liquidity_score: nullable(number()),
  public_interest_score: nullable(number()),
  market_data: nullable(MarketData),
  community_data: nullable(CommunityData),
  developer_data: nullable(DeveloperData),
  public_interest_stats: nullable(PublicInterestStats),
  status_updates: nullable(array(any())),
  last_updated: nullable(string()),
  tickers: nullable(array(Ticker)),
});

export default CoinFullInfoType;
