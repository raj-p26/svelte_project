import { writable } from "svelte/store";

const meetups = writable([
  {
    id: "m1",
    title: "Coding Bootcamp",
    subtitle: "Learn to code in 2 hours",
    description:
      "In this meetup, we will have some experts that teach you how to code.",
    imageUrl: "https://github.com/favicon.ico",
    address: "27th Nerd Road, 32523 New York",
    contactEmail: "code@test.com",
    isFavorite: false,
  },
  {
    id: "m2",
    title: "Swim together",
    subtitle: "Learn to Swim",
    description: "We will simply swim some rounds.",
    imageUrl: "https://facebook.com/favicon.ico",
    address: "27th Nerd Road, 32523 New York",
    contactEmail: "swim@test.com",
    isFavorite: false,
  },
]);

const meetupStore = {
  subscribe: meetups.subscribe,
  add: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false,
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
