
(function (globalObj) {
    // MakeBelieveElement constructor function
    function MakeBelieveElement(nodes) {
        // This means this instance of MakeBelieveElement
        this.nodes = nodes;
    };

    // helper functions
    function looping(cb, ret) {
        for (var i = 0; i < this.nodes.length; i++) {
            cb(this.nodes[i])
        }
        return ret();
    };

    function forEventHandlers(event, cb) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i] = addEventListener(event, cb);
        }
        return this;
    };

    Array.prototype.addToList = function (elem) {
        if (!this.includes(elem)) {
            this.push(elem);
        }
    };

    //Liður 2
    function query(cssSelector) {
        var inputs = document.querySelectorAll(cssSelector);
        return new MakeBelieveElement(inputs);
    };

    //Part 4
    MakeBelieveElement.prototype.parent = function (anyQuery) {
        var parents = [];
        return looping.call(this, function (currentElement) {
            var parent = currentElement.parentNode;
            if (anyQuery && parent.matches(anyQuery)) {
                parents.addToList(parent)
            } else if (!anyQuery) {
                parents.addToList(parent);
            }
        }, function () {
            return new MakeBelieveElement(parents, parents.length);
        });
    };

    //Part 5
    MakeBelieveElement.prototype.grandParent = function (anyQuery) {
        var grandParents = [];
        return looping.call(this, function (currentElement) {
            if (currentElement.parentNode && currentElement.parentNode.parentNode) {
                var grandParent = currentElement.parentNode.parentNode;
                if (anyQuery && grandParent.matches(anyQuery)) {
                    grandParents.addToList(grandParent)
                } else if (!anyQuery) {
                    grandParents.addToList(grandParent);
                }
            }
        }, function () {
            return new MakeBelieveElement(grandParents);
        });
    };

    //Part 6
    MakeBelieveElement.prototype.ancestor = function (anyQuery) {
        var ancestors = [];
        return looping.call(this, function (currentElement) {
            var ancestor = currentElement.parentNode.parentNode.parentNode;
            if (!anyQuery) {
                ancestors.addToList(ancestor);
            } else {
                while (ancestor.tagName != undefined) {
                    if (anyQuery && ancestor.matches(anyQuery)) {
                        ancestors.addToList(ancestor);
                    }
                    ancestor = ancestor.parentNode;
                }
            }
        }, function () {
            return new MakeBelieveElement(ancestors);
        });
    };

    //Part 7
    MakeBelieveElement.prototype.onClick = function (cb) {
        return forEventHandlers.call(this, 'click', cb);
    };

    //Part 8  --Insert a text to element, if there is text previously within the element it is overwritten.
    MakeBelieveElement.prototype.insertText = function (text) {
        return looping.call(this, function (elem) {
            elem.textContent = text;
        }, function () {
            console.log(text);
            return this;
        });
    };

    //Part 9
    MakeBelieveElement.prototype.append = function (str) {
        return looping.call(this, function (element) {
            if (typeof str == 'string') {
                element.innerHTML = element.innerHTML + str;
            } else if (element.nodeType == Node.ELEMENT_NODE) {
                element.insertAdjacentHTML('beforeend', str.parentElement.outerHTML)
            }
            console.log(str);
        }, function () {
            return this;
        });
    };

    //Part10
    MakeBelieveElement.prototype.prepend = function (str) {
        return looping.call(this, function (element) {
            if (typeof str == 'string') {
                element.innerHTML = str + element.innerHTML;
            } else if (element.nodeType == Node.ELEMENT_NODE) {
                element.insertAdjacentHTML('afterbegin', str.parentElement.outerHTML);
            }
            console.log(str);
        }, function () {
            return this;
        });
    };

    //Part 11 --Delete element, if no element is found with the query it has no effect.
    MakeBelieveElement.prototype.delete = function () {
        return looping.call(this, function (element) {
            element.remove();
        },
            function () {
                return this;
            });
    };

    //Part12


    // //Part 13 --css() which is used to change the direct css styles on the element,
    MakeBelieveElement.prototype.css = function (elem, value) {
        return looping.call(this, function (element) {
            element.style[elem] = value;
        },
            function () {
                console.log(elem, value);
                return this;

            });
    };

    //Part 14
    MakeBelieveElement.prototype.toggleClass = function (elem) {
        return looping.call(this, function (element) {
            element.classList.toggle(elem);
        },
            function () {
                console.log(elem);
                return this;
            });
    };

    //Part 15 --submit handler for forms
    MakeBelieveElement.prototype.onSubmit = function (cb) {
        return forEventHandlers.call(this, 'submit', cb);
    };

    //Part 16 --input handler for forms
    MakeBelieveElement.prototype.onInput = function (cb) {
        return forEventHandlers.call(this, 'input', cb);
    };

    globalObj.__ = query;
})(window);

/* Liður 2 */
var inputs = __('#my-form input');
console.log(inputs);

/* Liður 3*/
// Chaining test
var grandParentTest = __('input').parent().parent();
console.log(grandParentTest);

/* Liður 4 */
var password = __('#password').parent();
console.log(password);
var fParent = __('#password').parent('form');
console.log(fParent);

/* Liður 5 */
// Returns the div with the same id #grandfather
var grandParent = __('#password').grandParent();
console.log(grandParent);
// Returns the same div
var idGrandParent = __('#password').grandParent('#grandfather');
console.log(idGrandParent);
// Returns an empty object
var emptyGrandParent = __('#password').grandParent('#unknownId');
console.log(emptyGrandParent);

/* Liður 6 */

var ancestor = __('#password').ancestor();
console.log(ancestor);

var ancestorAncest = __('#password').ancestor('.ancestor');
console.log(ancestorAncest);
// Returns the div with the class .root
var rootElem = __('#password').ancestor('.root');
console.log(rootElem);
// Returns an empty object
var ancestorSib = __('#password').ancestor('.ancestor-sib');
console.log(ancestorSib);


//Part 7 --click handler
__("#password").onClick(function (evt) {
    console.log(evt.target.value);
});

//Part 8 --insert text
__('#shakespeare-novel').insertText('To be');
__('#shakespeare-novel').insertText('To be, or not to be: this is the question.');
__('#shakespeare-novel').insertText('Inserting text');

//Part 9 --append 
__('.the-appender').append('<p>I am an appended paragraph!</p>');
__('.the-appender').append(document.createElement('p').appendChild(document.createTextNode('I am an appended paragraph!')));

//Part 10 --prepend
__('.the-prepender').prepend('<p>I am an preprended paragraph!</p>');
__('.the-prepender').prepend(document.createElement('p').appendChild(document.createTextNode('I am an prepended paragraph!')));

//Part 11 --delete
__('.delete').delete();

//Part 13 --css change
__('.change-css').css('color', 'blue');

//Part 14 --toggle
__('#toggle').toggleClass('toggle');

//Part 15 --submit handler
__('#my-form').onSubmit(function (evt) {
    console.log(evt.target.value);
});

//Part 16 --input handler
__('#username').onInput(function (evt) {
    console.log(evt.target.value);
});












