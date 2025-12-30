Henna Gold - EdenEvent

מה יש באתר
- אתר תדמית פרימיום רספונסיבי (מובייל + מחשב)
- כמה עמודי HTML (בית, חבילות, גלריה, צור קשר)
- קובץ CSS אחד: style.css
- קובץ JS אחד: script.js
- גלריה עם הגדלה (Lightbox) + טעינה עצלה
- כפתור וואטסאפ צף בכל הדפים
- טופס צור קשר שמייצר הודעת וואטסאפ מסודרת

מבנה תיקיות
- index.html
- packages.html
- gallery.html
- contact.html
- style.css
- script.js
- assets/
  - logo.png
  - gallery/
    - 01.jpg / 01_sm.jpg וכו'

איך להחליף/להוסיף תמונות
1) שים תמונות מלאות בתוך assets/gallery בשם 11.jpg, 12.jpg ...
2) (מומלץ) שים גם תמונות קטנות לגריד בשם 11_sm.jpg, 12_sm.jpg ...
3) פתח script.js וחפש:
   const galleryImages = [
4) הוסף שורה לדוגמה:
   { src: "assets/gallery/11.jpg", thumb: "assets/gallery/11_sm.jpg", caption: "כותרת קצרה", tag: "ביגוד" },

טיפים לפרודקשן
- מומלץ לדחוס תמונות: Full עד ~1800px, Thumb עד ~720px
- אם מעלים לשרת: מומלץ להפעיל gzip/brotli

הרצה מקומית
- לפתוח את index.html בדפדפן
או
- להריץ שרת מקומי:
  python -m http.server 5500
  ואז להיכנס ל:
  http://localhost:5500
