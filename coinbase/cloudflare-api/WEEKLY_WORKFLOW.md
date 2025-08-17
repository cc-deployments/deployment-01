# Weekly CarMania Workflow 🚗

## **Your Simple Weekly Process (2 hours total)**

### **Friday Evening: Creative Batch Day**
1. **Create 7 cars on Manifold Studios** (~15 minutes each = ~2 hours total)
2. **Copy the mint URLs** from each Manifold Edition page
3. **Update the weekly batch script** with your actual URLs
4. **Deploy once** to Cloudflare Workers

### **Saturday-Friday: Automatic Daily Updates**
- **No work needed!** Your MiniApp automatically shows the right car each day
- **"UNLOCK THE RIDE" button** automatically links to that day's car
- **Active collectors** see something new every day

## **How It Works** ⚙️

### **Database Structure**
- Each car has a `publication_date` (YYYY-MM-DD format)
- Your MiniApp calls `/api/latest-mint` 
- API automatically finds the car with today's date
- Returns the correct `mint_url` for that day

### **Fallback System**
- If no car is scheduled for today → shows most recent car
- If no cars exist → redirects to your Manifold profile
- Always works, never breaks

## **Weekly Setup Steps** 📝

### **Step 1: Friday Evening Creative Session**
1. **Set aside 2 hours** on Friday evening for creative work
2. Go to [Manifold Studios](https://studios.manifold.xyz/)
3. Create 7 new NFT Editions (one for each day of the coming week)
4. Copy the mint URL from each (e.g., `https://app.manifold.xyz/c/car-name`)

### **Step 2: Update Weekly Batch Script**
1. Open `weekly-batch.sql`
2. Replace the example URLs with your actual Manifold URLs
3. Update the publication dates for the coming week (Saturday-Friday)
4. Save the file

### **Step 3: Deploy to Cloudflare**
```bash
cd coinbase/cloudflare-api
wrangler deploy
```

### **Step 4: Test & Relax**
- Visit your MiniApp
- Click "UNLOCK THE RIDE"
- Should redirect to Saturday's car
- **Enjoy your weekend!** The system works automatically for the next 7 days

## **Example Weekly Schedule** 📅

| Day | Date | Car | Status | Creation |
|-----|------|-----|--------|----------|
| Saturday | 2025-07-12 | Weekend Warrior | ✅ Live | Friday PM |
| Sunday | 2025-07-13 | Sunday Drive | ✅ Live | Friday PM |
| Monday | 2025-07-14 | Thunderbird at Lone Cypress | ✅ Live | Friday PM |
| Tuesday | 2025-07-15 | Westward Ho | ✅ Live | Friday PM |
| Wednesday | 2025-07-16 | Target Practice | ✅ Live | Friday PM |
| Thursday | 2025-07-17 | Bargemobile | ✅ Live | Friday PM |
| Friday | 2025-07-18 | Teenyosaurus | ✅ Live | Friday PM |

## **Benefits** 🎯

- ✅ **Set it and forget it** - works automatically for a week
- ✅ **No daily maintenance** - one deployment per week
- ✅ **Scalable** - easy to add more cars or extend dates
- ✅ **Reliable** - fallback system ensures it never breaks
- ✅ **Collector engagement** - active users see new content daily

## **Troubleshooting** 🔧

### **Car not showing for today?**
- Check the `publication_date` in your database
- Verify the date format is YYYY-MM-DD
- Make sure the car status is 'published'

### **Wrong car showing?**
- Check the database: `SELECT * FROM cars WHERE publication_date = date('now');`
- Verify today's date matches your publication dates

### **API not working?**
- Check Cloudflare Worker logs
- Verify the database is connected
- Test the endpoint directly: `https://ccult.carculture-com.workers.dev/api/latest-mint`

## **Next Steps** 🚀

1. **Deploy the updated Worker** with the new `/api/latest-mint` endpoint
2. **Populate your database** with the schema and sample data
3. **Test with your current car** (Light Bulb Moment)
4. **Plan your first weekly batch** for next week
5. **Enjoy automatic daily updates!** 🎉

---

**Time Investment**: 2 hours Friday evening → 7 days of automatic engagement
**Result**: Active collectors see new content every day without any daily work from you!

---

## **Friday Evening Workflow Summary** 🌆

### **Your Perfect Friday Evening:**
- **6:00 PM**: Start creative session
- **6:00-8:00 PM**: Create 7 cars on Manifold Studios
- **8:00-8:15 PM**: Update batch script and deploy
- **8:15 PM**: Test and relax
- **Saturday-Friday**: Zero work - system runs automatically!

### **Why Friday Evening Works Perfectly:**
- ✅ **Creative energy** - End of work week, relaxed mindset
- ✅ **Weekend prep** - Set up content for the coming week
- ✅ **Batch efficiency** - Create all cars in one focused session
- ✅ **Monday ready** - Start the week with everything automated
