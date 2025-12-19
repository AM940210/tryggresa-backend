import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "E-post och lösenord krävs",
            });
        }

        // Finns användaren?
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Användaren finns redan",
            });
        }

        // Hasha lösenord
        const hashedPassword = await bcrypt.hash(password, 10);

        // Skapa användaren
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return res.status(201).json({
            message: "Konto skapat",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Serverfel",
        });
    }
});

export default router;