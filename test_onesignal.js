const apiKey = process.argv[2];

if (!apiKey) {
    console.error("Please provide your OneSignal REST API Key as an argument.");
    console.error("Usage: node test_onesignal.js <YOUR_REST_API_KEY>");
    process.exit(1);
}

async function testNotification() {
    console.log("Sending scheduled test notification to OneSignal...");
    
    const now = new Date();
    // ඔයාගේ computer එකේ වෙලාව විනාඩි 6ක් slow නිසා, අපි විනාඩි 15ක් ඉස්සරහට දාමු!
    const d = new Date(now.getTime() + 15 * 60000); // 15 minutes in future
    
    const pad = (num) => String(num).padStart(2, '0');
    const offset = -d.getTimezoneOffset(); 
    const sign = offset >= 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const tzString = `GMT${sign}${pad(Math.floor(absOffset / 60))}${pad(absOffset % 60)}`;
    
    // YYYY-MM-DD HH:MM:SS GMT±HHMM
    const scheduledTimeStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${tzString}`;

    console.log("Your computer's current time:", now.toString());
    console.log("Strict OneSignal Format:", scheduledTimeStr);

    try {
        const response = await fetch("https://onesignal.com/api/v1/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${apiKey}`
            },
            body: JSON.stringify({
                app_id: "4436d79b-58af-4568-ac20-62578c4be3b5",
                included_segments: ["Total Subscriptions", "Subscribed Users"],
                headings: { "en": "Scheduled Test" },
                contents: { "en": "This notification was scheduled to arrive 5 minutes later." },
                url: `https://sh4lu-z.github.io/`,
                send_after: scheduledTimeStr
            })
        });

        const result = await response.json();
        
        console.log(`\nResponse Status: ${response.status} ${response.statusText}`);
        console.log("Response Body:", JSON.stringify(result, null, 2));

        if (response.ok && !result.errors) {
            console.log("\n✅ Success! Scheduled Notification sent.");
        } else {
            console.log("\n❌ Failed to send scheduled notification. Check the errors.");
        }
    } catch (error) {
        console.error("\n❌ Request failed:", error.message);
    }
}

testNotification();
