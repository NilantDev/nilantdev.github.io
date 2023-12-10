let PopupContent = {
    about: `
    <div class="about-wrapper">
        <span>
            Lywole is a game on knowledge of song lyrics.
            Every day we take one song and take all unique letters from its lyrics.
            Your task is to type one word at time to mention all letters.
            
            <h5>Example.</h5>
    
            There is all unique letters from The Beatles song "Yesterday". (Note taht the letters J and Q are absent because there are no words with such letters in lyrics).
            <div class="example-letter-wrapper"><span class="letter" data-letter="a">a</span><span class="letter" data-letter="b">b</span><span class="letter" data-letter="c">c</span><span class="letter" data-letter="d">d</span><span class="letter" data-letter="e">e</span><span class="letter" data-letter="f">f</span><span class="letter" data-letter="g">g</span><span class="letter" data-letter="h">h</span><span class="letter" data-letter="i">i</span><span class="letter" data-letter="k">k</span><span class="letter" data-letter="l">l</span><span class="letter" data-letter="m">m</span><span class="letter" data-letter="n">n</span><span class="letter" data-letter="o">o</span><span class="letter" data-letter="p">p</span><span class="letter" data-letter="r">r</span><span class="letter" data-letter="s">s</span><span class="letter" data-letter="t">t</span><span class="letter" data-letter="u">u</span><span class="letter" data-letter="v">v</span><span class="letter" data-letter="w">w</span><span class="letter" data-letter="y">y</span></div>
    
            You input word 'yesterday' and then the letters A, D, E, R, S, T, Y became grey.
            <div class="example-letter-wrapper"><span class="letter guessed" data-letter="a">a</span><span class="letter" data-letter="b">b</span><span class="letter" data-letter="c">c</span><span class="letter guessed" data-letter="d">d</span><span class="letter guessed" data-letter="e">e</span><span class="letter" data-letter="f">f</span><span class="letter" data-letter="g">g</span><span class="letter" data-letter="h">h</span><span class="letter" data-letter="i">i</span><span class="letter" data-letter="k">k</span><span class="letter" data-letter="l">l</span><span class="letter" data-letter="m">m</span><span class="letter" data-letter="n">n</span><span class="letter" data-letter="o">o</span><span class="letter" data-letter="p">p</span><span class="letter guessed" data-letter="r">r</span><span class="letter guessed" data-letter="s">s</span><span class="letter guessed" data-letter="t">t</span><span class="letter" data-letter="u">u</span><span class="letter" data-letter="v">v</span><span class="letter" data-letter="w">w</span><span class="letter guessed" data-letter="y">y</span></div>
    
            Your task to make grey all letters.
    
            You can give up and see words and lines with left letters.
        </span>
    </div>
`,

}