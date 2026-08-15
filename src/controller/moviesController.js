import { prisma } from "../config/db.js";

// GET /movies
// Get all movies
const getMovies = async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      status: "success",
      results: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /movies/:id
// Get a single movie
const getMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      return res.status(404).json({
        status: "error",
        message: "Movie not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /movies
// Create a movie
const createMovie = async (req, res, next) => {
  try {
    const existingAlready = await prisma.movie.findFirst({
      where: { title: req.body.title, releaseYear: req.body.releaseYear },
    });

    if (existingAlready) {
      res.status(409).json({
        error: "Movie already exists",
      });
    }

    const movie = await prisma.movie.create({
      data: {
        ...req.body,
        createdBy: req.user.id,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    next(err);
  }
};

// PUT /movies/:id
// Update a movie
const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await prisma.movie.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /movies/:id
// Delete a movie
const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.movie.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
