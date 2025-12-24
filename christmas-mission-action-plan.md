# Christmas Mission Action Plan

> Reference: See `christmas-mission-plan.md` for the full game design and flow details.

This is your step-by-step checklist to build and set up the Christmas Mission. Follow tasks in order.

---

## Phase 1: Code Implementation (Do First)

### Task 1.1: Add Christmas Present Icon to Navbar
**File:** `src/data/resume.tsx`

- [x] Import `Gift` icon from `lucide-react` (or use emoji 🎁 if icon not available)
- [x] Add new entry to `DATA.navbar` array:
  ```typescript
  { href: "/christmas-mission", icon: Gift, label: "Christmas Mission" }
  ```
- [x] Position it appropriately in the navbar array (probably first or last)

**File:** `src/components/navbar.tsx`

- [x] Add CSS animation for glowing effect (pulsing glow animation)
- [x] Apply animation class to the Christmas Mission link
- [x] Test that the icon appears and glows

**CSS Animation Example:**
```css
@keyframes glow {
  from { 
    filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.5));
  }
  to { 
    filter: drop-shadow(0 0 20px rgba(255, 0, 222, 1));
  }
}
```

---

### Task 1.2: Create Christmas Mission Route
**File:** `src/app/christmas-mission/page.tsx` (create new file)

- [x] Create new directory: `src/app/christmas-mission/`
- [x] Create `page.tsx` file
- [x] Set up basic page structure with terminal/command center aesthetic
- [x] Use black background, green text, monospace font
- [x] Add initial password screen (password: "koleda") - Password dialog appears on button click before navigation
- [x] After password entry, show mission dashboard
- [x] Create password constants file with master passwords

---

### Task 1.3: Build Mission Dashboard UI
**File:** `src/app/christmas-mission/page.tsx`

- [x] Create welcome message with typing animation effect
- [x] Display three locked boxes (visual locks)
- [x] Each box shows:
  - Lock icon/indicator
  - Present number/name
  - Status: [LOCKED] or [UNLOCKED]
- [x] Style locked boxes: grayscale, dashed border, disabled
- [x] Style active box: green border, glowing, enabled
- [x] Style unlocked box: white border, full color

---

### Task 1.4: Implement Level 1 - Family Photoshoot
**File:** `src/app/christmas-mission/page.tsx`

- [ ] Display English riddle
- [ ] Add password input field
- [ ] Add "UNLOCK" button
- [ ] Password validation: "snowman" (case insensitive)
- [ ] On correct password:
  - Hide riddle/input
  - Show unlock animation
  - Display "FAMILY PHOTOSHOOT EXPERIENCE!" message
  - Show "Merry Christmas Mum"
  - Unlock Level 2 (make Level 2 active)

**Riddle Text:**
```
"I have four legs but I cannot walk. I have a back but no spine. 
Go look under me in the dining room to find the password!"
```

---

### Task 1.5: Implement Level 2 - Clay Shooting
**File:** `src/app/christmas-mission/page.tsx`

- [ ] Level 2 starts locked (disabled) until Level 1 completes
- [ ] Display Bulgarian riddle
- [ ] Add 6-digit PIN input field (number input)
- [ ] Add "UNLOCK" button
- [ ] PIN validation: "592811" (or whatever you put in QR code)
- [ ] On correct PIN:
  - Hide riddle/input
  - Show unlock animation
  - Display "CLAY PIGEON SHOOTING!" message
  - Show "We are going hunting!"
  - Unlock Level 3 (make Level 3 active)

**Riddle Text (Bulgarian):**
```
"Tam kudeto zimata zhivee prez lyatoto..." 
(Where winter lives in summer)
Go there. Find the note. Watch the Video. Scan the Screen.
```

---

### Task 1.6: Implement Level 3 - Cirque du Soleil (The Grand Finale)
**File:** `src/app/christmas-mission/page.tsx`

- [ ] Level 3 starts locked until Level 2 completes
- [ ] Display three quick riddles/questions
- [ ] Add input fields for each question
- [ ] Add "SUBMIT ANSWERS" button
- [ ] On submit, show "Dual Authentication Required" section

**Dual Authentication Section:**
- [ ] **Lock A - Email Code:**
  - Show "Authorizing Protocol... Sending Code to [Dad's Name]..."
  - Display animated progress bar (takes ~5 seconds)
  - Show status text that updates during progress
  - When progress reaches 100%, show: "STATUS: Email Sent to Dad!"
  - Add 6-digit PIN input field for email code
  - PIN validation: "778899" (or whatever you put in email)

- [ ] **Lock B - Photo Hack:**
  - Show instruction: "The final key is hidden in the past. Check the very first photo in Dad's Camera Roll."
  - Add text input field for photo code
  - Code validation: "circus" (case insensitive, or whatever you write on photo)

- [ ] **Final Unlock Button:**
  - Only enabled when both codes are entered correctly
  - On unlock:
    - Hide dual auth section
    - Show grand unlock animation
    - Display "CIRQUE DU SOLEIL: OVO" title
    - Show "Royal Albert Hall - Jan 18, 2026"
    - Embed YouTube video (Cirque du Soleil OVO trailer)
    - Show final message: "Chestita Koleda Moite Lyubimi!"

**Riddle Questions (examples):**
1. "Koja godina e rodena Baba?" (When was Grandma born?)
2. "What is 50% of 200?"
3. "Koy e nai-dobriyat shofyor v semestvoto?" (Who is the best driver in the family?)

---

### Task 1.7: Add Animations and Polish
**File:** `src/app/christmas-mission/page.tsx`

- [ ] Typing animation for welcome text
- [ ] Unlock animations for each level
- [ ] Smooth scrolling when new level unlocks
- [ ] Progress bar animation for email sending
- [ ] Confetti or celebration effect on final unlock (optional)
- [ ] Responsive design (test on MacBook screen size)
- [ ] Ensure text is readable from couch distance

---

### Task 1.8: Test the Mission Page
- [ ] Test initial password entry
- [ ] Test Level 1 unlock flow
- [ ] Test Level 2 unlock flow
- [ ] Test Level 3 unlock flow (all steps)
- [ ] Test on MacBook screen
- [ ] Test with TV connection (if possible)
- [ ] Verify all passwords/codes work correctly
- [ ] Check that sequential unlocking works (can't skip levels)

---

## Phase 2: Physical Setup (Do Tonight)

### Task 2.1: Create Card for Under Christmas Tree
- [ ] Get a card or piece of paper
- [ ] Write: "Open me last - Only Ivi can open it"
- [ ] Inside, write: "Visit zdravkodanailov.com and find the glowing present button 🎁"
- [ ] Wrap it or put it in an envelope
- [ ] Place it under the Christmas tree (make sure it's the last one opened)

---

### Task 2.2: Set Up Level 1 Password Note
- [ ] Write password on a piece of paper: "Password: SNOWMAN" (or whatever password you chose)
- [ ] Hide it under a dining room chair (or wherever your riddle leads)
- [ ] Make sure it's hidden but findable when they look

---

### Task 2.3: Create YouTube QR Code Video
- [ ] Go to a QR code generator website (e.g., qr-code-generator.com)
- [ ] Generate QR code containing the text: "592811" (or your chosen 6-digit PIN)
- [ ] Take a screenshot or screen recording of the QR code
- [ ] Create a 10-second video showing the QR code (static image is fine)
- [ ] Upload to your YouTube channel
- [ ] Set video to Public or Unlisted
- [ ] Title it: "Mission Clue" or "Zdravko Mission Clue"
- [ ] Note the exact video title/URL for the fridge note

---

### Task 2.4: Set Up Fridge Note (Level 2)
- [ ] Write note: "To find the code, search '[Your YouTube Video Title]' on YouTube"
- [ ] Or write: "Go to YouTube Channel: ZdravkoDanailov and watch the video titled 'Mission Clue'"
- [ ] Tape note inside fridge (on milk bottle, wine bottle, or door)
- [ ] Make sure it's visible but not obvious

---

### Task 2.5: Edit Dad's First Photo (Level 3)
- [ ] Wait until Dad is asleep or away from phone
- [ ] Access Dad's phone
- [ ] Open Photos app
- [ ] Scroll to the very first photo (oldest photo)
- [ ] Edit the photo → Markup tool
- [ ] Write code in red: "CIRCUS" (or whatever code you chose)
- [ ] Save the edit
- [ ] **Important:** Remember you can undo this later if needed

---

### Task 2.6: Draft Email to Dad (Level 3)
- [ ] Open your email app on your phone
- [ ] Draft new email to Dad
- [ ] Subject: "TOP SECRET"
- [ ] Body: "Your Code is: 778899" (or whatever 6-digit code you chose)
- [ ] **DO NOT SEND YET** - Save as draft
- [ ] Keep email app easily accessible for tomorrow morning

---

## Phase 3: Final Testing & Prep (Tonight)

### Task 3.1: Test Full Flow
- [ ] Test website on MacBook
- [ ] Connect MacBook to TV via HDMI (if possible)
- [ ] Test zoom level (Cmd + / Cmd -) for readability from couch
- [ ] Test TV volume for final video
- [ ] Walk through entire mission flow mentally
- [ ] Verify all passwords/codes match between website and physical items

---

### Task 3.2: Prepare Backup Plans
- [ ] If QR code doesn't work: Be ready to manually reveal the code
- [ ] If photo edit doesn't work: Be ready to guide them to it
- [ ] If riddles are too hard: Be ready to help as "mainframe override"
- [ ] Keep phone nearby for manual email send during Level 3

---

### Task 3.3: Final Checklist
- [ ] Card is under tree
- [ ] Level 1 password note is hidden
- [ ] YouTube video is uploaded and accessible
- [ ] Fridge note is in place
- [ ] Dad's photo is edited
- [ ] Email draft is ready (not sent)
- [ ] Website is deployed/live
- [ ] All passwords/codes match between website and physical items
- [ ] MacBook is charged
- [ ] HDMI cable is ready (if using TV)

---

## Phase 4: Execution Day (Christmas Morning)

### Task 4.1: Morning Setup
- [ ] Connect MacBook to TV (if using TV)
- [ ] Open website on MacBook
- [ ] Test that glowing present button is visible
- [ ] Ensure TV volume is up
- [ ] Have phone ready with email draft open
- [ ] Position yourself where you can help if needed

---

### Task 4.2: During the Mission
- [ ] Let Ivi open the card
- [ ] Guide them to find the glowing present button
- [ ] Help with initial password if needed ("koleda")
- [ ] Watch them solve Level 1
- [ ] Watch them solve Level 2 (be ready to help with YouTube/QR scan)
- [ ] **During Level 3 progress bar:** When it reaches 100%, manually send the email draft
- [ ] Watch them solve Level 3
- [ ] Enjoy the reveal!

---

### Task 4.3: After the Mission
- [ ] Celebrate!
- [ ] Undo Dad's photo edit (if you want)
- [ ] Take down fridge note
- [ ] Clean up any other physical items

---

## Password/Code Reference

Keep these consistent across website and physical items:

- **Initial Password:** `koleda`
- **Level 1 Password:** `snowman` (written on note under chair)
- **Level 2 PIN:** `592811` (in QR code on YouTube video)
- **Level 3 Email Code:** `778899` (in email draft)
- **Level 3 Photo Code:** `circus` (written on Dad's first photo)

**Note:** You can change these, just make sure they match between website code and physical items!

---

## Quick Reference Links

- **Plan Document:** `christmas-mission-plan.md`
- **Navbar Component:** `src/components/navbar.tsx`
- **Resume Data:** `src/data/resume.tsx`
- **Mission Page:** `src/app/christmas-mission/page.tsx` (to be created)

---

## Tips

- Test everything tonight before Christmas morning
- Keep it fun - if something breaks, help them through it
- The "Wizard of Oz" approach (manual email send) is fine - they won't know!
- Make sure text is large enough to read from couch distance
- Have fun with it!

