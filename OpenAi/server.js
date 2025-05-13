// server.js
import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// OpenAI client setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

txt =""
// API endpoint
app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "system",
          content: `
          Generate a structured running workout plan for a single day. The output should match the following format:
          - Workout Name
          - Warm Up: time in minutes, pace type, pace (in mm:ss)
          - Work Section:
          - Type (Distance or Time)
          - Distance or Time value
          - Unit (e.g., km, miles, minutes)
          - Pace Type
          - Pace (mm:ss)
          - Repetitions
          - Cool Down: time in minutes, pace type, pace (mm:ss)
          - Comment (brief note about the workout)

          The plan should be suitable for runners of [BEGINNER/INTERMEDIATE/ADVANCED] level and focus on [GOAL: e.g., aerobic endurance, threshold training, recovery, intervals].

          *Output format (text only):*

          Workout Name: [name]
          Warm Up: [time] min, [pace type], pace [mm:ss]
          Work Section:
            Type: [Distance/Time]
            Value: [number]
            Unit: [km/miles/minutes]
            Pace Type: [Easy/Moderate/Threshold/etc.]
            Pace: [mm:ss]
            Repetitions: [number]
          Cool Down: [time] min, [pace type], pace [mm:ss]
          Comment: [your comment]

          Example:
          Workout Name: Aerobic Endurance Run  
          Warm Up: 15 min, Easy, pace 05:30  
          Work Section:  
            Type: Distance  
            Value: 5  
            Unit: km  
            Pace Type: Easy  
            Pace: 04:45  
            Repetitions: 1  
          Cool Down: 10 min, Easy, pace 06:00  
          Comment: Maintain steady effort and focus on form.
              
          Make sure the values are realistic for the specified level and goal.`.trim()
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    let content = completion.choices[0].message.content;
    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch (e) {
      parsed = { raw: content }; // fallback if not valid JSON
    }

    res.json(parsed);

  } catch (err) {
    console.error("Error from OpenAI:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
