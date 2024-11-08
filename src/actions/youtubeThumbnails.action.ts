'use server';

import { channels } from '@/mocks/channel';

export async function fetchYoutubeChannels() {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const channelIds = Object.values(channels)
    .map((channel) => channel.id)
    .join(',');
  const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.items) {
      return transformChannelData(data.items);
    }
  } catch (error) {
    console.error('Failed to fetch channel images:', error);
    throw error;
  }
}

function transformChannelData(data) {
  const channels = {};

  [...data].map((channel) => {
    switch (channel.id) {
      case 'UC2b4WRE5BZ6SIUWBeJU8rwg':
        return (channels['STEL_LIVE'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@stellive_official',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      case 'UC6YnTqZidFg4WUiXpiCtSSQ':
        return (channels['AIRI_KANNA'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@airikannach',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      case 'UClbYIn9LDbbFZ9w2shX3K0g':
        return (channels['AYAYSUNO_YUNI'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@ayatsunoyuni',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      case 'UC7-m6jQLinZQWIbwm9W-1iw':
        return (channels['AKANE_LIZE'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@akanelize',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      case 'UC_eeSpMBz8PG4ssdBPnP07g':
        return (channels['NENEKO_MASHIRO'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@neneko_mashiro',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      case 'UC1afpiIuBDcjYlmruAa0HiA':
        return (channels['SHIRAYUKI_HINA'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@shirayukihina',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      case 'UCAHVQ44O81aehLWfy9O6Elw':
        return (channels['ARAHASHI_TABI'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@arahashitabi',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      case 'UCYxLMfeX1CbMBll9MsGlzmw':
        return (channels['TENKO_SHIBUKI'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@tenkoshibuki',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      case 'UCQmcltnre6aG9SkDRYZqFIg':
        return (channels['AOKUMO_RIN'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@aokumorin',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      case 'UCcA21_PzN1EhNe7xS4MJGsQ':
        return (channels['HANAKO_NANA'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@hanako_nana',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      case 'UCj0c1jUr91dTetIQP2pFeLA':
        return (channels['YUZUHA_RIKO'] = {
          id: channel.id,
          name: channel.snippet.title,
          url: 'https://www.youtube.com/@yuzuhariko',
          imageUrl: channel.snippet.thumbnails.high.url,
        });
      default:
        return channel;
    }
  });
  return channels;
}
