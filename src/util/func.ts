import prisma from "@/util/prisma";

export const validateUser = async (identifier: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        identifier: identifier,
      },
    });

    if (user) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
