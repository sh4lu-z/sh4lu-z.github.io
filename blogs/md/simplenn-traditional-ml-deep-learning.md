
![Machine Learning & Deep Learning](https://s3.ap-southeast-1.amazonaws.com/files-scs-prod/public%2Fimages%2F1605842918803-AI+vs+ML+vs+DL.png)


Machine Learning සහ Deep Learning කියන්නේ අද කාලයේ තොරතුරු තාක්ෂණ ක්ෂේත්‍රයේ නිතරම ඇහෙන වචන දෙකක්. හැබැයි කෙනෙක් අලුතින්ම මේ ක්ෂේත්‍රයට එද්දී, "මොකක්ද මේ පරණ Machine learning ක්‍රම සහ අලුත් Deep Learning ක්‍රම අතර තියෙන වෙනස?" කියන ප්‍රශ්නය මතු වෙනවා. විශේෂයෙන්ම Text Analysis වගේ දේකදී මේ වෙනස ගොඩක් කැපී පේනවා. 


අන්න ඒ වෙනස ප්‍රායෝගිකව අත්හදා බලන්න පුලුවන් වෙන්න සරලව නිර්මාණය කරපු  GitHub repository එකක් තමයි **SimpleNN** කියන්නේ. මේක විශේෂයෙන්ම නිර්මාණය කරලා තියෙන්නේ Sentiment Analysis (වාක්‍යයක  ධනාත්මකද සෘණාත්මකද යන්න හඳුනාගැනීම) සඳහායි.


අපි බලමු මේ ප්‍රොජෙක්ට් එක ඇතුළේ මොනවද තියෙන්නේ සහ එයින් අපිට ඉගෙන ගන්න පුළුවන් මොනවද කියලා.


---

## 🛠️ එකම ප්‍රශ්නයට විසඳුම් දෙකක්: ML vs Deep Learning


මෙම ප්‍රොජෙක්ට් එකේ ප්‍රධාන අරමුණ වෙන්නේ ක්‍රමවේද දෙකක් යටතේ Sentiment Classification එකක් කරන්නේ කොහොමද කියලා පෙන්වා දීමයි. 


### 1.  Machine Learning  (The Traditional Way)


ඔයා ප්‍රොජෙක්ට් එකේ ඇති `sentiment_classifier_nb.py` ෆයිල් එක බැලුවොත්, එහි භාවිතා කරලා තියෙන්නේ සාමානය  ක්‍රමවේදයක්. මෙහිදී **scikit-learn** භාවිතා කරලා වාක්‍යයක තියෙන වචන සංඛ්‍යාත්මක දත්ත බවට පත් කරන්නේ **TF-IDF (Term Frequency-Inverse Document Frequency)** කියන ක්‍රමය හරහායි. ඒ කියන්නේ යම්කිසි වචනයක් කොච්චර වැදගත්ද කියලා ගණනය කරන එකයි. ඉන්පසුව **Multinomial Naive Bayes** කියන ඇල්ගොරිතම එක හරහා මෙය Positive ද Negative ද කියලා තීරණය කරනවා.


* **මෙහි වාසිය:** මේ ක්‍රමය ඉතාමත් වේගවත්. ඒ වගේම අපිට ප්‍රතිඵලය ආවේ කොහොමද කියලා පැහැදිලිව බලාගන්න (Interpretable) පුළුවන්.


### 2.  Deep Learning  (The Modern Way)


අනෙක් අතට `sentiment_classifier_nn.ipynb` කියන Jupyter Notebook එකේ තියෙන්නේ **TensorFlow / Keras** භාවිතා කරලා හදපු Neural Network එකක්. මෙහිදී වචන හඳුනාගන්නේ නිකන්ම අංක වලින් නෙවෙයි, **Embedding Layer** එකක් හරහා වචන වලට 16-dimensional අවකාශයක් ලබා දෙනවා. ඊට පස්සේ Global Average Pooling සහ Dense Layers (ReLU සහ Sigmoid activation සමගින්) හරහා ගිහින් තමයි අවසාන තීරණය දෙන්නේ.


* **මෙහි වාසිය:** මේ ක්‍රමයට වචන වල තේරුම සහ වාක්‍යයේ වචන පෙළගැසී ඇති රටාව (Semantic meanings and sequences) තේරුම් ගැනීමේ සුවිශේෂී හැකියාවක් තියෙනවා.* 
![](https://raw.githubusercontent.com/sh4lu-z/SimpleNN/main/src/SimpleNN.png)

---

## 📊 කුමක්ද වඩාත් හොඳ?


මෙම වගුවෙන් මේ ක්‍රම දෙකෙහි ප්‍රධාන ලක්ෂණ සාරාංශ කරලා තියෙනවා. මේ මගින් ඔබට ඔබේ මීළඟ AI ප්‍රොජෙක්ට් එකට වඩාත් සුදුසු ක්‍රමය කුමක්දැයි තීරණය කරන්න පුළුවන්.


| ලක්ෂණය | Machine Learning (Naive Bayes) | Deep Learning (Neural Network) |
| :--- | :--- | :--- |
| **භාවිතා වන තාක්ෂණය** | scikit-learn, numpy | tensorflow, keras, numpy |
| **දත්ත සකසන ක්‍රමය** | TF-IDF Vectorization | Word Embeddings (16-D vector space) |
| **වේගය** | ඉතා වේගවත් (Fast training) | සාපේක්ෂව වැඩි කාලයක් ගනී |
| **තේරුම් ගැනීමේ හැකියාව** | වචනවල වැදගත්කම පමණක් සලකයි | වචන වල සැබෑ අර්ථය (Semantics) තේරුම් ගනී |
| **Output ස්වභාවය** | පැහැදිලි Probability අගයක් | 0.0 සිට 1.0 දක්වා (Sigmoid) පරාසයක් |


---


## 📈 පුහුණු කිරීම සහ දත්ත (Training & Dataset)


මෙම මොඩල් දෙකම පුහුණු කරලා තියෙන්නේ සැබෑ ලෝකයේ පාරිභෝගික ප්‍රතිචාර (Customer feedback) නියෝජනය කරන Review 100 කින් යුත් කුඩා, හැබැයි පැහැදිලි දත්ත (Dataset) භාවිතයෙනි. මෙහි ධනාත්මක ප්‍රතිචාර 50ක් සහ සෘණාත්මක ප්‍රතිචාර 50ක් අඩංගු වෙනවා.


* **Positive Example:** *"Exceeded my expectations in every way"* 
* **Negative Example:** *"Broke within the first five minutes of use"* 


![Training Loss & Accuracy](https://miro.medium.com/0*sBZ4CiiBnSl87CwS.png)


ඔබ ඉහත ප්‍රස්ථාරය දෙස බැලුවහොත්, Neural Network එක Epochs ගණනාවක් පුරා දත්ත වලින් ඉගෙන ගනිමින්, තමන්ගේ Loss අගය ටිකෙන් ටික අඩු කරගන්නා ආකාරය මනාවට පැහැදිලි වෙනවා. අවසානයේදී පුහුණු කළ මොඩලය `sentiment_model.keras` ලෙසත්, වචන හඳුනාගන්නා ආකාරය `tokenizer.json` ලෙසත් ප්‍රොජෙක්ට් එකේ සේව් වෙනවා.

---

## 🚀 ඔබේ පරිගණකයේ මෙය Run කරන්නේ කෙසේද?


මේක කියවලා විතරක් මදි, ඔබත් කෝඩ් එක Run කරලම බලන්න ඕනේ. ඒ සඳහා පහත පියවර අනුගමනය කරන්න.


**1. අවශ්‍ය Libraries Install කරගන්න:**


```bash
pip install tensorflow scikit-learn numpy jupyter
```

**2. Naive Bayes Classifier එක Run කිරීම:**
Terminal එකේ පහත කමාන්ඩ් එක ලබා දෙන්න. මෙය ක්ෂණිකව ක්‍රියාත්මක වී ප්‍රතිඵල පෙන්වාවි.


```bash
python sentiment_classifier_nb.py
```

**3. Neural Network එක Run කිරීම:**

Jupyter Notebook හරහා ඩීප් ලර්නිං කෝඩ් එක පියවරෙන් පියවර අධ්‍යයනය කරන්න පුළුවන්.

```bash
jupyter notebook
```
ඉන්පසු බ්‍රවුසරයෙන් `sentiment_classifier_nn.ipynb` ගොනුව විවෘත කර එහි ඇති සෙල් (cells) එකින් එක run කරන්න.

---

👉 **SimpleNN Repository එක මෙතනින් බලන්න:** [https://github.com/sh4lu-z/SimpleNN](https://github.com/sh4lu-z/SimpleNN)

*(ඔබටත් මෙවැනි දේවල් අත්හදා බලන්න උනන්දුවක් තියෙනවද? පහළින් Comment එකක් දාගෙනම යන්න!)