export interface LoveStoryConfig {
  couple: {
    herName: string;
    herNickname: string;
    hisName: string;
    anniversaryDate: string;
    milestone: string;
  };
  audio: {
    title: string;
    artist: string;
    src: string;
  };
  chapter1: {
    title: string;
    subtitle: string;
    openingPhoto: string;
    messageLines: string[];
  };
  chapter2: {
    title: string;
    subtitle: string;
    memories: Array<{
      id: number;
      photo: string;
      caption: string;
      date?: string;
      tag?: string;
    }>;
  };
  chapter3: {
    title: string;
    subtitle: string;
    envelopeTitle: string;
    loveReasons: string[];
    specialCheekMessage: string;
  };
  chapter4: {
    title: string;
    subtitle: string;
    dreams: Array<{
      id: number;
      title: string;
      description: string;
      icon: string;
      wish: string;
    }>;
  };
  chapter5: {
    title: string;
    subtitle: string;
    months: Array<{
      monthNumber: number;
      title: string;
      reflection: string;
      highlight: string;
    }>;
  };
  chapter6: {
    title: string;
    instruction: string;
    finalHeader: string;
    finalSubheader: string;
    finalMessageLines: string[];
    closingQuote: string;
    signature: string;
    featuredPhoto: string;
  };
}

export const loveStoryConfig: LoveStoryConfig = {
  couple: {
    herName: "Prani",
    herNickname: "Prani ma 💞",
    hisName: "Your Soulmate",
    anniversaryDate: "6 Months Together",
    milestone: "6 Months, 26 Weeks, 182 Days, 4,368 Hours & Still Counting...",
  },
  audio: {
    title: "Visiri",
    artist: "Enai Noki Paayum Thota",
    src: "/audio/Visiri-Ringtone.mp3",
  },
  chapter1: {
    title: "CHAPTER 01",
    subtitle: "MY FIRST WISH & MESSAGE",
    openingPhoto: "/photos/photo_opening.jpg",
    messageLines: [
      "Happy Anniversary Prani ma 💞",
      "These 6-months with you was soo sweet.. Filled with Soo much of Happiness and Love... had great memories together 🫂",
      "I wish and pray.. that our relationship should continue till my last breath...",
      "And must turn into marrying you as my Wifee <<3 and Beloved Soul Mate 💞",
      "If Life repeats 1000 times... I would always choose you.. Everytime and Forever ♾️ as my Wifee",
    ],
  },
  chapter2: {
    title: "CHAPTER 02",
    subtitle: "OUR LITTLE UNIVERSE",
    memories: [
      {
        id: 1,
        photo: "/photos/memory_traditional.jpg",
        caption: "You look ethereal in ethnic wear... with that jhumka, your gentle smile, and the bindi. Standing beside my future wife in traditional attire is pure bliss ✨💛",
        date: "Festive Vibes",
        tag: "My Queen",
      },
      {
        id: 2,
        photo: "/photos/memory_holding_hands.jpg",
        caption: "Intertwined fingers, holding your soft hand tight with that cute ring. A promise that no matter where life leads, I will never let go of this hand 🤝💍",
        date: "A Sacred Promise",
        tag: "Never Let Go",
      },
      {
        id: 3,
        photo: "/photos/memory_1.jpg",
        caption: "Standing beside you, my favorite place in the whole world. That smile lights up every elevator ride and every room we enter ✨",
        date: "Sweet Moments",
        tag: "Sweet Smiles",
      },
      {
        id: 4,
        photo: "/photos/memory_2.jpg",
        caption: "Bus journeys, leaning into each other, feeling at home no matter where the road takes us 🚌💖",
        date: "Everyday Adventures",
        tag: "In Your Arms",
      },
      {
        id: 5,
        photo: "/photos/memory_3.jpg",
        caption: "My sweetest Pookie 🎀 Leaning back, silly laughter, and eyes that capture my entire soul.",
        date: "Pure Happiness",
        tag: "Pookie Time",
      },
      {
        id: 6,
        photo: "/photos/memory_4.jpg",
        caption: "My superhero, my favorite partner in crime. In color or black & white, you're the one who makes everything vibrant 🖤🤍",
        date: "Forever Vibes",
        tag: "Soul Connections",
      },
    ],
  },
  chapter3: {
    title: "CHAPTER 03",
    subtitle: "THE LITTLE THINGS I LOVE ABOUT YOU",
    envelopeTitle: "A Love Letter For Prani",
    loveReasons: [
      "I lost in your eyes.. that my eyes sees only you in the entire world 💖...",
      "Your cheeks..! The softest and the Tastiest thing i could ever Bite 🫠😋",
      "The warmth you bring into my life whenever you call me or hold my hand.",
      "The way you giggle and the gentle kindness in your heart.",
      "How safe and peaceful the world feels when I am right next to you.",
    ],
    specialCheekMessage: "P.S. Warning: Cheeks are subject to constant emergency bites! 🙈🥰",
  },
  chapter4: {
    title: "CHAPTER 04",
    subtitle: "THREE DREAMS, ONE FUTURE",
    dreams: [
      {
        id: 1,
        title: "Dream 01: A Lifetime of Sweet Memories",
        description: "To build a wonderful and Beautiful life with you.. filled with sweet memories and joy.",
        icon: "✨",
        wish: "Holding hands at 80, looking back at our million memories together.",
      },
      {
        id: 2,
        title: "Dream 02: Our Little Princess",
        description: "Have a little princess... A miniature version of you 🥰",
        icon: "👑",
        wish: "Watching her grow with your radiant eyes, your kind heart, and your angelic smile.",
      },
      {
        id: 3,
        title: "Dream 03: Our Dream Home",
        description: "A beautiful house.. just you n me.. 💞 as you always longing for!",
        icon: "🏡",
        wish: "A cozy sanctum filled with our love, warmth, laughter, and late-night talks.",
      },
    ],
  },
  chapter5: {
    title: "CHAPTER 05",
    subtitle: "SIX MONTHS OF US",
    months: [
      {
        monthNumber: 1,
        title: "Month 1 — The Spark",
        reflection: "The magical start where two hearts found each other and the journey began.",
        highlight: "Falling deeper with every whisper and every smile.",
      },
      {
        monthNumber: 2,
        title: "Month 2 — Sweet Comfort",
        reflection: "Realizing you are not just my love, but my safest sanctuary and comfort zone.",
        highlight: "Those endless late night conversations.",
      },
      {
        monthNumber: 3,
        title: "Month 3 — Deeper Bonds",
        reflection: "Overcoming little moments, learning each other, and choosing each other relentlessly.",
        highlight: "Knowing my heart belongs entirely to you.",
      },
      {
        monthNumber: 4,
        title: "Month 4 — Unspoken Language",
        reflection: "One glance into your eyes and we already know what each other is feeling.",
        highlight: "Losing myself in those enchanting eyes.",
      },
      {
        monthNumber: 5,
        title: "Month 5 — Stronger Together",
        reflection: "Through every busy day and every ride, you are the thought that brings me peace.",
        highlight: "Dreams of our future starting to take beautiful shape.",
      },
      {
        monthNumber: 6,
        title: "Month 6 — Half a Year & Forever Ahead",
        reflection: "182 days, 26 weeks, thousands of smiles... and this is just the wonderful prologue.",
        highlight: "Ready to walk all upcoming years together with my Wifee <<3",
      },
    ],
  },
  chapter6: {
    title: "CHAPTER 06",
    instruction: "Touch and Hold the Heart to Ignite Our Fireworks",
    finalHeader: "HAPPY SIX MONTHS, MY LOVE ❤️",
    finalSubheader: "Six months down... A million beautiful memories still waiting for us.",
    finalMessageLines: [
      "If I could choose again, I'd still choose you.",
      "Here's to us, our little world, and everything waiting for us.",
    ],
    closingQuote: "From our first touch to eternity... I love you, Prani ma 💞",
    signature: "Forever Yours",
    featuredPhoto: "/photos/memory_traditional.jpg",
  },
};
