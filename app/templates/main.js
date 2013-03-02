/*jshint strict:false, browser:true */
(function bookmarklet() {
  var styleNode = document.createElement('style'),
    content = document.createTextNode('body { background: cornflowerblue; }');

  styleNode.appendChild(content);
  document.head.appendChild(styleNode);
}());
