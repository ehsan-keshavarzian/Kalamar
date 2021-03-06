requirejs.config({
  baseUrl: '../js/src',
  paths : {
    'lib': '../lib'
  }
});

// Parse and show the table
// Override getMatchInfo API call
require(['init'], function () {

  var snippet = "<span title=\"cnx/l:meist\">" +
  "  <span title=\"cnx/p:ADV\">" +
  "    <span title=\"cnx/syn:@PREMOD\">" +
  "      <span title=\"mate/l:meist\">" +
  "        <span title=\"mate/p:ADV\">" +
  "          <span title=\"opennlp/p:ADV\">meist</span>" +
  "        </span>" +
  "      </span>" +
  "    </span>" +
  "  </span>" +
  "</span>" +
  "<span title=\"cnx/l:deutlich\">" +
  "  <span title=\"cnx/p:A\">" +
  "    <span title=\"cnx/syn:@PREMOD\">" +
  "      <span title=\"mate/l:deutlich\">" +
  "        <span title=\"mate/m:degree:pos\">" +
  "          <span title=\"mate/p:ADJD\">" +
  "            <span title=\"opennlp/p:ADJD\">deutlich</span>" +
  "          </span>" +
  "        </span>" +
  "      </span>" +
  "    </span>" +
  "  </span>" +
  "</span>" +
  "<span title=\"cnx/l:fähig\">" +
  "  <span title=\"cnx/l:leistung\">" +
  "    <span title=\"cnx/p:A\">" +
  "      <span title=\"cnx/syn:@NH\">" +
  "        <span title=\"mate/l:leistungsfähig\">" +
  "          <span title=\"mate/m:degree:comp\">" +
  "            <span title=\"mate/p:ADJD\">" +
  "              <span title=\"opennlp/p:ADJD\">leistungsfähiger</span>" +
  "            </span>" +
  "          </span>" +
  "        </span>" +
  "      </span>" +
  "    </span>" +
  "  </span>" +
  "</span>";

  var treeSnippet =
  "<span class=\"context-left\"></span>" +
  "<span class=\"match\">" +
  "  <span title=\"xip/c:MC\">" +
  "    <span title=\"xip/c:TOP\">" +
  "      <span title=\"xip/c:PP\">" +
  "        <span title=\"xip/c:PREP\">Mit</span>" +
  "        <span title=\"xip/c:NP\">" +
  "          <span title=\"xip/c:DET\">dieser</span>" +
  "          <span title=\"xip/c:NPA\">" +
  "            <span title=\"xip/c:NOUN\">Methode</span>" +
  "          </span>" +
  "        </span>" +
  "      </span>" +
  "      <span title=\"xip/c:VERB\">ist</span>" +
  "      <mark>" +
  "        <span title=\"xip/c:NP\">" +
  "          <span title=\"xip/c:PRON\">es</span>" +
  "        </span>" +  
  "        <span title=\"xip/c:AP\">" +
  "          <span title=\"xip/c:ADV\">nun</span>" +
  "          <span title=\"xip/c:ADJ\">möglich</span>" +
  "        </span>" +
  "      </mark>" +
  "      <span title=\"xip/c:ADV\">z. B.</span>" +
  "      <span title=\"xip/c:NPA\">" +
  "        <span title=\"xip/c:NP\">" +
  "          <span title=\"xip/c:NOUN\">Voice</span>" +
  "        </span>" +
  "      </span>" + "(" +
  "      <span title=\"xip/c:INS\">" +
  "        <span title=\"xip/c:NPA\">" +
  "          <span title=\"xip/c:NP\">" +
  "            <span title=\"xip/c:NOUN\">Sprache</span>" +
  "          </span>" +
  "        </span>" +
  "      </span>" + ")" +
  "      <span title=\"xip/c:VERB\">bevorzugt</span>" +
  "      <span title=\"xip/c:PP\">" +
  "        <span title=\"xip/c:PREP\">in</span>" +
  "        <span title=\"xip/c:NP\">" +
  "          <span title=\"xip/c:PRON\">der</span>" +
  "        </span>" +
  "        <span title=\"xip/c:NPA\">" +
  "          <span title=\"xip/c:NP\">" +
  "            <span title=\"xip/c:NOUN\">Bridge</span>" +
  "          </span>" +
  "        </span>" +
  "      </span>" +
  "      <span title=\"xip/c:INFC\">" +
  "        <span title=\"xip/c:INS\">" +
  "          <span title=\"xip/c:VERB\">weiterzugeben</span>" +
  "        </span>" +
  "      </span>" +
  "    </span>" +
  "  </span>" +
  "</span>" +
  "<span class=\"context-right\"></span>";

//  var treeSnippet = "<span class=\"context-left\"><\/span><span class=\"match\">In diesem <span title=\"cnx\/c:np\">Sinne<\/span> schrieb <span title=\"cnx\/c:np\">Brunschwicg<\/span>:&quot;In <span title=\"cnx\/c:np\">Euklids<\/span> <span title=\"cnx\/c:np\">Elementen<\/span> <span title=\"cnx\/c:np\">spiegel<\/span> sich die <span title=\"cnx\/c:np\">Resultate<\/span> der <span title=\"cnx\/c:np\">Arbeit von Generationen vor Aristoteles<\/span> wider, nicht nur die <span title=\"cnx\/c:np\">technische Arbeit<\/span> der <span title=\"cnx\/c:np\">Entdecklung<\/span>, sondern auch die <span title=\"cnx\/c:np\">methodologische Arbeit<\/span> der <span title=\"cnx\/c:np\">Verbindung<\/span> und des <span title=\"cnx\/c:np\">Beweises<\/span>, die, in der <span title=\"cnx\/c:np\">Schule<\/span> des <span title=\"cnx\/c:np\">Phythagoras<\/span> begonnen, ihre <span title=\"cnx\/c:np\">Vollendung in den Schulen von Eudoxos von Cnidus<\/span> und <span title=\"cnx\/c:np\">Platon<\/span> gefunden hat&quot;(5<\/span><span class=\"context-right\"><\/span>";

  KorAP.API.getMatchInfo = function(match, callObj, cb) {
    console.dir(callObj);
    if (callObj["spans"] !== undefined && callObj["spans"] === true) {
      return cb({ "snippet": treeSnippet });
    }
    else {
      return cb({ "snippet": snippet });
    }
  };
});
