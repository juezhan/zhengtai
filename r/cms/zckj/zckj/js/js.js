var tabBGImagePath = "" ;
var tabBGImageType = "_bg.gif" ;
var debug = false ;
function switchTab (tab)
{
    var tabName = getTabGroupName (tab.id) ;
    if (tabName == '')
    {
        alert ("No tabName for tab [" + tab.id + "]") ;
        return ;
    }
    var index = 1 ;
    while (true)
    {
        var tabTitle = document.getElementById (tabName + '_' + index) ;
        if (tabTitle == undefined)
            break ;
        deonTabTitle (tabTitle , tabName) ;
        var tabContent = document.getElementById (tabName + '_' + index + '_content') ;
        if (tabContent != undefined)
            tabContent.style.display = "NONE" ;
        index ++ ;
    }

    if (debug)
        alert ("Find " + (index - 1) + " tab title(s) for TabName [" + tabName + "]") ;
    onTabTitle (tab , tabName) ;
    var tabContent = document.getElementById (tab.id + '_content') ;
    if (tabContent != undefined)
        tabContent.style.display = "BLOCK" ;
    var tabHeader = document.getElementById (tabName + "_header") ;
    if (tabHeader != undefined)
    {
        tabHeader.className = "tabheader_" + tab.id ;
    }
}
function getTabGroupName (tabId)
{
    if (tabId == '' || tabId == undefined)
    {
        alert ("tabId is NULL! [" + tabId + "]") ;
        return ;
    }
    var i = tabId.lastIndexOf ('_') ;
    if (i <= 1)
        return '' ;
    return tabId.substr (0 , i) ;
}
function deonTabTitle (tab , tabName)
{
    tab.className = tabName + "_off" ;
}
function onTabTitle (tab , tabName)
{
    tab.className = tabName + "_on" ;
}
