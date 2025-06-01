# University Finder API

A smart little API that helps students find universities they qualify for; based on GRE, IELTS, and CGPA scores. Built with Node.js + Express and a sprinkle of logic magic.

Check it out: [https://universityfinder.sohamjadhav.in](https://universityfinder.sohamjadhav.in)


---

## How It Works

1. Normalize your scores to a 0–100 scale  
2. Calculate a weighted score:  
   `50% GRE + 30% IELTS + 20% CGPA`  
3. Match universities in your target country  
4. Return results sorted by ranking

---

##  API Endpoints

### `POST /find-colleges`
Send your country + score, get matching universities.

```json
{
  "country": "USA",
  "score": 87.3
}
```

### `GET /health`

Checks if the API is alive 

### `GET /stats`

Stats about the current dataset 

---

## Live API

> [https://college-api-0qgk.onrender.com](https://college-api-0qgk.onrender.com)

Try it out with Postman, cURL, or your browser.

---

Made with <3

;-)
