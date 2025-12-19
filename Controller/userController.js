import todoCollection from "../Model/todoModel.js";

export const getUserStreak = async (req, res) => {
  try {
    const userId = req.user._id;

    const todos = await todoCollection.find({
      user: userId,
      completed: true,
      completedAt: { $exists: true },
    });

    if (todos.length === 0) {
      return res.json({ currentStreak: 0 });
    }

    const uniqueDates = [
      ...new Set(
        todos.map(t =>
          new Date(t.completedAt).toDateString()
        )
      ),
    ];

    uniqueDates.sort((a, b) => new Date(b) - new Date(a));

    let streak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const prev = new Date(uniqueDates[i - 1]);
      const curr = new Date(uniqueDates[i]);

      const diff = (prev - curr) / (1000 * 60 * 60 * 24);

      if (diff === 1) streak++;
      else break;
    }

    res.json({ currentStreak: streak });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mess: "Failed to calculate streak" });
  }
};
