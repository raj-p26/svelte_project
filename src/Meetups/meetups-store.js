import { writable } from "svelte/store";

const meetups = writable([]);

const meetupStore = {
  subscribe: meetups.subscribe,
  setMeetups: (items) => {
    meetups.set(items);
  },
  add: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
    };
    meetups.update((items) => [newMeetup, ...items]);
  },
  toggleFavorite: (id) => {
    meetups.update((items) => {
      const updatedMeetup = { ...items.find((m) => m.id == id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIdx = items.findIndex((m) => m.id == id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIdx] = updatedMeetup;

      return updatedMeetups;
    });
  },
  update: (id, meetupData) => {
    meetups.update((items) => {
      const meetupIdx = items.findIndex((item) => item.id === id);
      const updatedMeetup = { ...meetups[meetupIdx], ...meetupData };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIdx] = updatedMeetup;

      return updatedMeetups;
    });
  },
  remove: (id) => {
    meetups.update((items) => items.filter((item) => item.id != id));
  },
};

export default meetupStore;
