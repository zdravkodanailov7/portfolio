# Operation Danailov: Christmas Mission 2025

## Overview
An interactive, escape-room style Christmas gift reveal experience using the website as the central hub. Three presents need to be unlocked through riddles, hunts, and challenges.

## The Presents
1. **Family Photoshoot Experience** - For Mum
2. **Private Clay Shooting Experience for Two** - For Dad & Zdravko
3. **Cirque du Soleil: OVO** - For the whole family (Royal Albert Hall, Jan 18, 2026)

## The Setup Flow

### Initial Setup
- Everyone sits on the couch
- They open all presents under the Christmas tree
- One final card/envelope remains with instruction: "Open me last - Only Ivi can open it"
- Inside the card: Simple URL instruction to visit `zdravkodanailov.com` and find the glowing present button in the navigation

### Website Entry Point
- Add a glowing present icon (🎁) to the navigation bar that pulses/glows
- Clicking it starts the mission
- First screen: Password prompt (simple password: "koleda")
- After password entry, navigate to the main mission dashboard

## The Mission Dashboard

### Visual Design
- Terminal/command center aesthetic (black background, green text, monospace font)
- Three locked boxes displayed, showing three presents that need to be unlocked
- Typing animation welcome message explaining:
  - "This year there are three locked presents that won't be opened so easily"
  - "You must complete tasks to get passwords/keys to unlock them"
  - "Presents can only be unlocked chronologically"

### Level Structure
Each level must be completed before the next unlocks.

---

## Level 1: Family Photoshoot (For Mum)

### Step 1: English Riddle
- Simple, fun riddle that Ivi can solve
- Example: "I have four legs but I cannot walk. I have a back but no spine. Go look under me in the dining room to find the password!"
- Answer leads them to find a hidden note (e.g., under a chair)

### Step 2: Password Entry
- They find a handwritten note with a password (e.g., "SNOWMAN")
- Enter password on the website

### Step 3: Unlock Animation
- Lock animation plays
- Reveal: "FAMILY PHOTOSHOOT EXPERIENCE!"
- Message: "Merry Christmas Mum"
- Level 2 becomes active

---

## Level 2: Clay Shooting (For Dad & Zdravko)

### Step 1: Bulgarian Riddle
- Riddle in Bulgarian that leads to the fridge
- Example: "Tam kudeto zimata zhivee prez lyatoto..." (Where winter lives in summer)

### Step 2: The Hunt
- Find a note in the fridge
- Note says: "Go to YouTube Channel: ZdravkoDanailov and watch the video titled 'Mission Clue'" (or similar)

### Step 3: QR Code Scan (No Printer Solution)
- They navigate to YouTube on phone/TV
- Video shows a static QR code image (10-second video)
- Scan the QR code from the screen
- QR code contains a 6-digit PIN (e.g., "592811")

### Step 4: PIN Entry
- Enter the 6-digit code on the website

### Step 5: Unlock Animation
- Lock animation plays
- Reveal: "CLAY PIGEON SHOOTING!"
- Message: "We are going hunting!"
- Level 3 becomes active

---

## Level 3: Cirque du Soleil (The Grand Finale)

### Step 1: Three Quick Riddles
- Mix of Bulgarian and English questions
- Family trivia questions
- Examples:
  - "Koja godina e rodena Baba?" (When was Grandma born?)
  - "What is 50% of 200?"
  - "Koy e nai-dobriyat shofyor v semestvoto?" (Who is the best driver in the family?)

### Step 2: Dual Authentication Required
After riddles are answered, two locks appear:

#### Lock A: Email Code
- Website shows: "Authorizing Protocol... Sending Code to [Dad's Name]..."
- Progress bar animation plays (takes ~5 seconds)
- **Manual Step**: When progress bar completes, Zdravko manually sends pre-drafted email to Dad
- Email contains: "Subject: TOP SECRET. Your Code is: [6-digit code, e.g., 778899]"
- Dad enters the code from email

#### Lock B: Photo Hack
- Website says: "The final key is hidden in the past. Check the very first photo in Dad's Camera Roll."
- **Setup Required**: Edit Dad's very first photo (using Markup) to write a code (e.g., "CIRCUS")
- They find the code and enter it

### Step 3: Grand Unlock
- Both codes entered correctly
- Unlock animation
- Reveal: "CIRQUE DU SOLEIL: OVO"
- Video plays: Official Cirque du Soleil OVO trailer
- Final message: "Chestita Koleda Moite Lyubimi!"

### Step 4: Final Display
- All three presents displayed together
- Celebration message

---

## Pre-Christmas Setup Checklist

### Tonight's Tasks

1. **Photo Hack Setup**
   - Access Dad's phone when he's asleep
   - Open Photos app, scroll to very first photo
   - Edit → Markup → Write code in red (e.g., "CIRCUS")
   - Save

2. **YouTube QR Code Video**
   - Generate QR code online containing 6-digit number (e.g., "592811")
   - Record 10-second video of QR code on screen
   - Upload to YouTube channel as Public or Unlisted
   - Title: "Mission Clue" or similar

3. **Fridge Note**
   - Write note: "To find the code, search 'Zdravko Mission Clue' on YouTube"
   - Hide in fridge (tape to milk bottle or wine bottle)

4. **Level 1 Password Note**
   - Write note with password (e.g., "Password: SNOWMAN")
   - Hide under dining room chair (or wherever riddle leads)

5. **Email Draft**
   - Draft email to Dad on phone
   - Subject: "TOP SECRET"
   - Body: "Your Code is: [6-digit code, e.g., 778899]"
   - Save as draft (don't send yet)

6. **Card for Under Tree**
   - Create card: "Open me last - Only Ivi can open it"
   - Inside: Instructions to visit `zdravkodanailov.com` and find glowing present button

7. **Website Updates**
   - Add glowing present icon to navigation bar
   - Create `/christmas-mission` page (or route)
   - Build the mission interface with all three levels
   - Test on TV/MacBook to ensure readability from couch

---

## Technical Implementation Notes

### Navigation Button
- Add present icon (🎁) to navbar
- CSS animation: pulsing glow effect
- Links to `/christmas-mission` route

### Mission Page Features
- Terminal/command center aesthetic
- Typing animation for welcome text
- Three locked boxes (visual locks)
- Sequential unlocking (Level 2 locked until Level 1 complete)
- Password/PIN input fields
- Progress bar animation for "email sending"
- Video embed for Cirque du Soleil trailer
- Responsive design (optimized for TV/MacBook viewing)

### Password/Code Configuration
- Initial password: "koleda"
- Level 1 password: "snowman" (or whatever is written on note)
- Level 2 PIN: "592811" (or whatever is in QR code)
- Level 3 email code: "778899" (or whatever is in email draft)
- Level 3 photo code: "circus" (or whatever is written on photo)

### Manual Interventions (Wizard of Oz Style)
- Email sending: Manual send when progress bar completes
- If riddles are too hard: Can override/help as "mainframe override"
- Keep it fun and flexible

---

## Execution Day Tips

1. **Test Setup**
   - Connect MacBook to TV via HDMI
   - Test zoom level (Cmd + / Cmd -) for readability from couch
   - Ensure TV volume is up for final video

2. **Flow Management**
   - Keep phone nearby for manual email send
   - Be ready to help if they get stuck (maintain the magic)
   - Enjoy watching them solve it!

3. **Backup Plans**
   - If QR code doesn't work: Can manually reveal code
   - If photo edit doesn't work: Can guide them to it
   - Keep it fun, not frustrating

---

## Bulgarian Phrases to Include

- "Chestita Koleda Moite Lyubimi!" - Merry Christmas my loved ones
- "Tam kudeto zimata zhivee prez lyatoto" - Where winter lives in summer
- "Greshka!" - Error (for wrong answers)
- "Usmivka" - Smile (could be used as password hint)

---

## Notes

- No printer needed: QR code shown via YouTube video
- Email sending is manual (no backend required)
- Photo editing is done beforehand
- Keep riddles simple enough for Ivi to participate
- Mix of Bulgarian and English for family engagement
- Terminal aesthetic for cool factor
- Sequential unlocking maintains suspense

