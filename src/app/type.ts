export type Tcourse = {
  title: String;
  price: String;
  thumbnail: String;
  description: String;
};

export type Tmodule = {
  courseId: string;
  title: string;
  moduleNumber: number;
};

export type Tuser = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type Tlecture = {
  moduleId: string;
  title: string;
  videoUrl: string;
  pdfNotes: [string];
};

export type TsignInUser = {
  email: string;
  password: string;
};

export const USER_ROLE = {
  user: "user",
  admin: "admin",
} as const;

export type TuserRole = keyof typeof USER_ROLE;
