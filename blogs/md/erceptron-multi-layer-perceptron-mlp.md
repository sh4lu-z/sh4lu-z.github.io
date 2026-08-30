අපි හැමෝම අද AI ගැන කතා කළාට, මේ හැමදේකම පටන්ගත්තෙ කොතනින්ද කියලා ඔයා කවදාහරි හිතලා තියෙනවද? අද අපි කතා කරන්න යන්නේ  AI වල හදවත වන Neural Networks වල ආරම්භයේ ඉඳන්ම කතාවයි. ඒ කියන්නේ සරල Perceptron එකක ඉඳන් Multi-Layer Perceptron (MLP) එකක් දක්වා AI එකක් දියුණු වුණු හැටි .

## මිනිස් මොළයෙන් පරිගණකයට (Biological Inspiration)

පරිගණකයකට හිතන්න පුරුදු කරන්න කලින්, විද්‍යාඥයන්ට ඕන වුණේ අපේ මොළය වැඩ කරන්නේ කොහොමද කියලා තේරුම් ගන්නයි. අපේ මොළයේ තියෙනවා <mark>නියුරෝන (Biological Neurons)</mark> බිලියන ගණනක්. මේවා එකිනෙකට සම්බන්ධ වෙලා තමයි අපි හිතන දේවල්, කරන දේවල් පාලනය කරන්නේ.

මේ සංකල්පය පදනම් කරගෙන තමයි 1958 දී Frank Rosenblatt කියන විද්‍යාඥයා විසින් ලොව පළමු කෘත්‍රිම නියුරෝනය වෙන Perceptron එක හඳුන්වා දුන්නේ. ඇත්තටම ජීව විද්‍යාත්මක නියුරෝනයක් කෘත්‍රිම නියුරෝනයකට සමාන වෙන්නේ මෙහෙමයි

*  Dendrite = කෘත්‍රිම නියුරෝනයට දත්ත ලබාදෙන (Inputs) මාර්ගය.
*  Cell Body = ලැබෙන දත්ත එකතු කරලා ගණනය කරන තැන (Summation).
*  Axon = අවසාන තීරණය පිටතට දෙන මාර්ගය (Output).

![Biological Neuron vs Artificial Neuron](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1788089049435-1hkyltodpjjgo32docown5w.png)
<sub><a href="https://towardsdatascience.com/the-concept-of-artificial-neurons-perceptrons-in-neural-networks-fab22249cbfc/">Towards Data Science</a></sub>

## Perceptron එකක් ගණනය කිරීම් කරන්නේ කොහොමද?

කෘත්‍රිම නියුරෝනයක් ඇතුළේ ඇත්තටම වෙන්නේ සරල ගණිත කර්මයක්. මේක තේරුම් ගන්න අපි ප්‍රධාන කොටස් 3ක් බලමු

* Inputs $$(x_1, x_2)$$ අපි නියුරෝනයට ලබා දෙන දත්ත. (උදාහරණයක් විදිහට ගෙදරක වර්ග අඩිය සහ කාමර ගණන). 
* Weights $$w_1, w_2$$ ලැබෙන එක් එක් දත්තයට තියෙන වැදගත්කම (Strength). ගෙදරක මිල තීරණය කරද්දී කාමර ගණනට වඩා වර්ග අඩිය වැදගත් නම් ඒකේ weight එක වැඩියි.
* Bias $$b$$ තීරණයක් ගැනීමට අවශ්‍ය මූලික එළිපත්ත (Threshold). මේක හරියට කිසිම input එකක් නැති වුණත් තියෙන base value එක වගේ.
