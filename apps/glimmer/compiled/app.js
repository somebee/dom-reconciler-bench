(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()})(0,function(){"use strict"
function e(e="unreachable"){return new Error(e)}let t=0
function s(){return Object.create(null)}const n=Object.freeze([]),i=1
class r{validate(e){return this.value()===e}}r.id=0
const a=[],l=[]
class o{constructor(e,t){this.type=e,this.inner=t}value(){return(0,a[this.type])(this.inner)}validate(e){return(0,l[this.type])(this.inner,e)}}function h(e){let t=a.length
a.push(e=>e.value()),l.push((e,t)=>e.validate(t)),e.id=t}a.push(()=>0),l.push((e,t)=>0===t)
const u=new o(0,null)
a.push(()=>NaN),l.push((e,t)=>NaN===t)
const c=new o(1,null)
a.push(()=>g),l.push((e,t)=>t===g)
const p=new o(2,null)
function d({tag:e}){return e===u}function m(e){return e===u}let g=i
class f extends r{static create(e=g){return new o(this.id,new f(e))}constructor(e=g){super(),this.revision=e}value(){return this.revision}dirty(){this.revision=++g}}function b(e){let t=[]
for(let s=0,n=e.length;s<n;s++){let n=e[s].tag
if(n===c)return c
n!==u&&t.push(n)}return k(t)}function y(e){let t=[],s=e.head()
for(;null!==s;){let n=s.tag
if(n===c)return c
n!==u&&t.push(n),s=e.nextNode(s)}return k(t)}function v(e){let t=[]
for(let s=0,n=e.length;s<n;s++){let n=e[s]
if(n===c)return c
n!==u&&t.push(n)}return k(t)}function k(e){switch(e.length){case 0:return u
case 1:return e[0]
case 2:return S.create(e[0],e[1])
default:return C.create(e)}}h(f)
class w extends r{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let{lastChecked:e,lastValue:t}=this
return e!==g&&(this.lastChecked=g,this.lastValue=t=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class S extends w{static create(e,t){return new o(this.id,new S(e,t))}constructor(e,t){super(),this.first=e,this.second=t}compute(){return Math.max(this.first.value(),this.second.value())}}h(S)
class C extends w{static create(e){return new o(this.id,new C(e))}constructor(e){super(),this.tags=e}compute(){let{tags:e}=this,t=-1
for(let s=0;s<e.length;s++){let n=e[s].value()
t=Math.max(n,t)}return t}}h(C)
class _ extends w{static create(e){return new o(this.id,new _(e))}constructor(e){super(),this.tag=e,this.lastUpdated=i}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(e){e!==this.tag&&(this.tag=e,this.lastUpdated=g,this.invalidate())}}h(_)
class E{constructor(){this.lastRevision=null,this.lastValue=null}value(){let{tag:e,lastRevision:t,lastValue:s}=this
return null!==t&&e.validate(t)||(s=this.lastValue=this.compute(),this.lastRevision=e.value()),s}invalidate(){this.lastRevision=null}}class x{constructor(e){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=e.tag,this.reference=e}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let{reference:e,lastRevision:t}=this,s=e.tag
if(s.validate(t))return A
this.lastRevision=s.value()
let{lastValue:n}=this,i=e.value()
return i===n?A:(this.lastValue=i,i)}initialize(){let{reference:e}=this,t=this.lastValue=e.value()
return this.lastRevision=e.tag.value(),this.initialized=!0,t}}const A="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
function T(e){return e!==A}class N{constructor(e){this.inner=e,this.tag=u}value(){return this.inner}}class O{constructor(e){this.next=null,this.prev=null,this.value=e}}class B{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e.next}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=t.next}insertBefore(e,t=null){return null===t?this.append(e):(t.prev?t.prev.next=e:this._head=e,e.prev=t.prev,e.next=t,t.prev=e,e)}append(e){let t=this._tail
return t?(t.next=e,e.prev=t,e.next=null):this._head=e,this._tail=e}remove(e){return e.prev?e.prev.next=e.next:this._head=e.next,e.next?e.next.prev=e.prev:this._tail=e.prev,e}}Object.freeze([])
class L extends O{constructor(e,t){super(e.valueReferenceFor(t)),this.retained=!1,this.seen=!1,this.key=t.key,this.iterable=e,this.memo=e.memoReferenceFor(t)}update(e){this.retained=!0,this.iterable.updateValueReference(this.value,e),this.iterable.updateMemoReference(this.memo,e)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class D{constructor(e){this.iterator=null,this.map=Object.create(null),this.list=new B,this.tag=e.tag,this.iterable=e}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let e
return e=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,e}has(e){return!!this.map[e]}get(e){return this.map[e]}wasSeen(e){let t=this.map[e]
return void 0!==t&&t.seen}append(e){let{map:t,list:s,iterable:n}=this,i=t[e.key]=new L(n,e)
return s.append(i),i}insertBefore(e,t){let{map:s,list:n,iterable:i}=this,r=s[e.key]=new L(i,e)
return r.retained=!0,n.insertBefore(r,t),r}move(e,t){let{list:s}=this
e.retained=!0,s.remove(e),s.insertBefore(e,t)}remove(e){let{list:t}=this
t.remove(e),delete this.map[e.key]}nextNode(e){return this.list.nextNode(e)}head(){return this.list.head()}}class M{constructor(e){this.iterator=null
let t=new D(e)
this.artifacts=t}next(){let{artifacts:e}=this,t=(this.iterator=this.iterator||e.iterate()).next()
return null===t?null:e.append(t)}}var I;(function(e){e[e.Append=0]="Append",e[e.Prune=1]="Prune",e[e.Done=2]="Done"})(I||(I={}))
class R{constructor({target:e,artifacts:t}){this.target=e,this.artifacts=t,this.iterator=t.iterate(),this.current=t.head()}sync(){let e=I.Append
for(;;)switch(e){case I.Append:e=this.nextAppend()
break
case I.Prune:e=this.nextPrune()
break
case I.Done:return void this.nextDone()}}advanceToKey(e){let{current:t,artifacts:s}=this,n=t
for(;null!==n&&n.key!==e;)n.seen=!0,n=s.nextNode(n)
null!==n&&(this.current=s.nextNode(n))}nextAppend(){let{iterator:e,current:t,artifacts:s}=this,n=e.next()
if(null===n)return this.startPrune()
let{key:i}=n
return null!==t&&t.key===i?this.nextRetain(n):s.has(i)?this.nextMove(n):this.nextInsert(n),I.Append}nextRetain(e){let{artifacts:t,current:s}=this;(s=s).update(e),this.current=t.nextNode(s),this.target.retain(e.key,s.value,s.memo)}nextMove(e){let{current:t,artifacts:s,target:n}=this,{key:i}=e,r=s.get(e.key)
r.update(e),s.wasSeen(e.key)?(s.move(r,t),n.move(r.key,r.value,r.memo,t?t.key:null)):this.advanceToKey(i)}nextInsert(e){let{artifacts:t,target:s,current:n}=this,i=t.insertBefore(e,n)
s.insert(i.key,i.value,i.memo,n?n.key:null)}startPrune(){return this.current=this.artifacts.head(),I.Prune}nextPrune(){let{artifacts:e,target:t,current:s}=this
if(null===s)return I.Done
let n=s
return this.current=e.nextNode(n),n.shouldRemove()?(e.remove(n),t.delete(n.key)):n.reset(),I.Prune}nextDone(){this.target.done()}}let F=null
class V{constructor(e){this.tags=s(),this.computedPropertyTags=s(),this.trackedProperties=e?Object.create(e.trackedProperties):s(),this.trackedComputedProperties=e?Object.create(e.trackedComputedProperties):s()}tagFor(e){let t=this.tags[e]
return t||(this.trackedComputedProperties[e]?this.tags[e]=this.updatableTagFor(e):this.tags[e]=f.create())}updatableTagFor(e){let t
return this.trackedComputedProperties[e]?(t=this.computedPropertyTags[e])||(this.computedPropertyTags[e]=_.create(u)):(t=this.tags[e])||(this.tags[e]=_.create(u))}}const H=new WeakMap
function j(e){let t=H.get(e)
if(t)return t
let s=function(e){let t=null,s=e
for(;!t;){if(!(s=P(s)))return t
t=H.get(s)}return t}(e)
return t=new V(s),H.set(e,t),t}const P=Object.getPrototypeOf
f.create()
class z extends Error{constructor(e,t,s){super(s),this.target=e,this.key=t}static for(e,t){return new z(e,t,`The property '${t}' on ${e} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}function U(e,t,s=function(e,t){throw z.for(e,t)}){if("object"==typeof e&&e){return j(e).tagFor(t)}return u}class ${constructor(e){this.debugName=null,this.__args__=null,Object.assign(this,e)}get element(){let{bounds:e}=this
return function(e,t){if(!e)throw new Error(t||"assertion failure")}(e&&e.firstNode===e.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),e.firstNode}get args(){var e,t
return e=this,t="args",F&&F.add(j(e).updatableTagFor(t)),this.__args__}set args(e){this.__args__=e,j(this).updatableTagFor("args").inner.update(p)}static create(e){return new this(e)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const W={attributeHook:!0,createArgs:!0,createCaller:!1,createInstance:!0,dynamicLayout:!1,dynamicScope:!1,dynamicTag:!0,elementHook:!0,prepareArgs:!1,updateHook:!0}
class G{constructor(e,t,s,n){this.name=e,this.manager=t,this.ComponentClass=s,this.handle=n,this.state={name:e,capabilities:W,ComponentClass:s,handle:n}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class Y{constructor(e){this._bounds=e}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}const q=new class{constructor(){this.evaluateOpcode=function(e){let t=new Array(e)
for(let s=0;s<e;s++)t[s]=null
return t}(98).slice()}add(e,t,s="syscall"){this.evaluateOpcode[e]={syscall:"syscall"===s,evaluate:t}}debugBefore(e,t,s){return{sp:void 0,state:void 0}}debugAfter(e,t,s,n){let{sp:i,state:r}=n}evaluate(e,t,s){let n=this.evaluateOpcode[s]
n.syscall?n.evaluate(e,t):n.evaluate(e.inner,t)}}
class K{constructor(){this._guid=++t}}class J extends K{constructor(){super(...arguments),this.next=null,this.prev=null}}var X;(function(e){e[e.pc=0]="pc",e[e.ra=1]="ra",e[e.fp=2]="fp",e[e.sp=3]="sp",e[e.s0=4]="s0",e[e.s1=5]="s1",e[e.t0=6]="t0",e[e.t1=7]="t1",e[e.v0=8]="v0"})(X||(X={}))
class Q extends N{constructor(e){super(e)}static create(e){return void 0===e?te:null===e?se:!0===e?ne:!1===e?ie:"number"==typeof e?new ee(e):new Z(e)}get(e){return te}}class Z extends Q{constructor(){super(...arguments),this.lengthReference=null}get(e){if("length"===e){let{lengthReference:e}=this
return null===e&&(e=this.lengthReference=new ee(this.inner.length)),e}return super.get(e)}}class ee extends Q{constructor(e){super(e)}}const te=new ee(void 0),se=new ee(null),ne=new ee(!0),ie=new ee(!1)
class re{constructor(e){this.inner=e,this.tag=e.tag}value(){return this.toBool(this.inner.value())}toBool(e){return!!e}}class ae extends E{constructor(e){super(),this.parts=e,this.tag=b(e)}compute(){let e=new Array
for(let t=0;t<this.parts.length;t++){let s=this.parts[t].value()
null!=s&&(e[t]=le(s))}return e.length>0?e.join(""):null}}function le(e){return"function"!=typeof e.toString?"":String(e)}q.add(1,(e,{op1:t})=>{let s=e.stack,n=e.constants.resolveHandle(t)(e,s.pop())
e.loadValue(X.v0,n)}),q.add(6,(e,{op1:t})=>{let s=e.referenceForSymbol(t)
e.stack.push(s)}),q.add(4,(e,{op1:t})=>{let s=e.stack.pop()
e.scope().bindSymbol(t,s)}),q.add(5,(e,{op1:t})=>{let s=e.stack.pop(),n=e.stack.pop(),i=e.stack.pop(),r=i?[s,n,i]:null
e.scope().bindBlock(t,r)}),q.add(96,(e,{op1:t})=>{let s=e.constants.getString(t),n=e.scope().getPartialMap()[s]
void 0===n&&(n=e.getSelf().get(s)),e.stack.push(n)}),q.add(20,(e,{op1:t,op2:s})=>{e.pushRootScope(t,!!s)}),q.add(7,(e,{op1:t})=>{let s=e.constants.getString(t),n=e.stack.pop()
e.stack.push(n.get(s))}),q.add(8,(e,{op1:t})=>{let{stack:s}=e,n=e.scope().getBlock(t)
n?(s.push(n[2]),s.push(n[1]),s.push(n[0])):(s.push(null),s.push(null),s.push(null))}),q.add(9,(e,{op1:t})=>{let s=!!e.scope().getBlock(t)
e.stack.push(s?ne:ie)}),q.add(10,e=>{e.stack.pop(),e.stack.pop()
let t=e.stack.pop(),s=t&&t.parameters.length
e.stack.push(s?ne:ie)}),q.add(11,(e,{op1:t})=>{let s=new Array(t)
for(let n=t;n>0;n--){s[n-1]=e.stack.pop()}e.stack.push(new ae(s))})
const oe="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function he(e){return!(!e||!e[oe])}class ue{constructor(e,t){this.inner=e,this.args=t,this[oe]=!0}unwrap(e){e.realloc(this.offset)
let t=this
for(;;){let{args:s,inner:n}=t
if(s&&(e.positional.prepend(s.positional),e.named.merge(s.named)),!he(n))return n
t=n}}get offset(){let{inner:e,args:t}=this,s=t?t.positional.length:0
return he(e)?s+e.offset:s}}function ce(e){return pe(e)?"":String(e)}function pe(e){return null==e||"function"!=typeof e.toString}function de(e){return"object"==typeof e&&null!==e&&"number"==typeof e.nodeType}function me(e){return"string"==typeof e}class ge extends J{constructor(e,t,s){super(),this.node=e,this.reference=t,this.lastValue=s,this.type="dynamic-text",this.tag=t.tag,this.lastRevision=this.tag.value()}evaluate(){let{reference:e,tag:t}=this
t.validate(this.lastRevision)||(this.lastRevision=t.value(),this.update(e.value()))}update(e){let t,{lastValue:s}=this
if(e!==s&&(t=pe(e)?"":me(e)?e:String(e))!==s){this.node.nodeValue=this.lastValue=t}}}class fe extends re{static create(e){return new fe(e)}toBool(e){return he(e)}}class be{constructor(e){this.inner=e,this.tag=e.tag}value(){let e=this.inner.value()
return function(e){return me(e)||pe(e)||"boolean"==typeof e||"number"==typeof e}(e)?1:(t=e)&&t[oe]?0:function(e){return"object"==typeof e&&null!==e&&"function"==typeof e.toHTML}(e)?3:function(e){return de(e)&&11===e.nodeType}(e)?4:de(e)?5:1
var t}}q.add(28,e=>{let t=e.stack.pop().value(),s=pe(t)?"":String(t)
e.elements().appendDynamicHTML(s)}),q.add(29,e=>{let t=e.stack.pop().value().toHTML(),s=pe(t)?"":t
e.elements().appendDynamicHTML(s)}),q.add(32,e=>{let t=e.stack.pop(),s=t.value(),n=pe(s)?"":String(s),i=e.elements().appendDynamicText(n)
d(t)||e.updateWith(new ge(i,t,n))}),q.add(30,e=>{let t=e.stack.pop().value()
e.elements().appendDynamicFragment(t)}),q.add(31,e=>{let t=e.stack.pop().value()
e.elements().appendDynamicNode(t)}),q.add(22,e=>e.pushChildScope()),q.add(23,e=>e.popScope()),q.add(44,e=>e.pushDynamicScope()),q.add(45,e=>e.popDynamicScope()),q.add(12,(e,{op1:t})=>{e.stack.push(e.constants.getOther(t))}),q.add(13,(e,{op1:t})=>{let s=e.stack,n=t>>3
switch(7&t){case 0:s.push(n)
break
case 1:s.push(e.constants.getNumber(n))
break
case 2:s.push(e.constants.getString(n))
break
case 3:s.pushEncodedImmediate(t)
break
case 4:case 5:s.push(e.constants.getNumber(n))}}),q.add(14,e=>{let t=e.stack
t.push(Q.create(t.pop()))}),q.add(15,e=>{let t=e.stack
t.push(t.peek().value())}),q.add(16,(e,{op1:t,op2:s})=>{let n=e.fetchValue(t)-s
e.stack.dup(n)}),q.add(17,(e,{op1:t})=>{e.stack.pop(t)}),q.add(18,(e,{op1:t})=>{e.load(t)}),q.add(19,(e,{op1:t})=>{e.fetch(t)}),q.add(43,(e,{op1:t})=>{let s=e.constants.getArray(t)
e.bindDynamicScope(s)}),q.add(61,(e,{op1:t})=>{e.enter(t)}),q.add(62,e=>{e.exit()}),q.add(48,(e,{op1:t})=>{e.stack.push(e.constants.getSerializable(t))}),q.add(47,e=>{e.stack.push(e.scope())}),q.add(46,e=>{let t=e.stack,s=t.pop()
s?t.pushSmi(s.compile()):t.pushNull()}),q.add(51,e=>{let{stack:t}=e,s=t.pop(),n=t.pop(),i=t.pop(),r=t.pop()
if(null===i)return e.pushFrame(),void e.pushScope(n)
let a=n
{let e=i.parameters,t=e.length
if(t>0){a=a.child()
for(let s=0;s<t;s++)a.bindSymbol(e[s],r.at(s))}}e.pushFrame(),e.pushScope(a),e.call(s)}),q.add(53,(e,{op1:t})=>{let s=e.stack.pop()
if(d(s))s.value()&&e.goto(t)
else{let n=new x(s)
n.peek()&&e.goto(t),e.updateWith(new ye(n))}}),q.add(54,(e,{op1:t})=>{let s=e.stack.pop()
if(d(s))s.value()||e.goto(t)
else{let n=new x(s)
n.peek()||e.goto(t),e.updateWith(new ye(n))}}),q.add(55,(e,{op1:t,op2:s})=>{e.stack.peek()===s&&e.goto(t)}),q.add(56,e=>{let t=e.stack.peek()
d(t)||e.updateWith(ye.initialize(new x(t)))}),q.add(63,e=>{let{env:t,stack:s}=e
s.push(t.toConditionalReference(s.pop()))})
class ye extends J{constructor(e){super(),this.type="assert",this.tag=e.tag,this.cache=e}static initialize(e){let t=new ye(e)
return e.peek(),t}evaluate(e){let{cache:t}=this
T(t.revalidate())&&e.throw()}}q.add(26,(e,{op1:t})=>{e.elements().appendText(e.constants.getString(t))}),q.add(27,(e,{op1:t})=>{e.elements().appendComment(e.constants.getString(t))}),q.add(33,(e,{op1:t})=>{e.elements().openElement(e.constants.getString(t))}),q.add(34,e=>{let t=e.stack.pop().value()
e.elements().openElement(t)}),q.add(41,e=>{let t,s,n=e.stack.pop(),i=e.stack.pop(),r=e.stack.pop().value()
if(d(n))t=n.value()
else{let s=new x(n)
t=s.peek(),e.updateWith(new ye(s))}if(d(i))s=i.value()
else{let t=new x(i)
s=t.peek(),e.updateWith(new ye(t))}e.elements().pushRemoteElement(t,r,s)}),q.add(42,e=>{e.elements().popRemoteElement()}),q.add(38,e=>{let t=e.fetchValue(X.t0)
t&&(t.flush(e),e.loadValue(X.t0,null)),e.elements().flushElement()}),q.add(39,e=>{e.elements().closeElement()}),q.add(40,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),n=e.stack.pop(),{constructing:i,updateOperations:r}=e.elements(),a=e.dynamicScope(),l=s.create(i,n,a,r)
e.env.scheduleInstallModifier(l,s)
let o=s.getDestructor(l)
o&&e.newDestroyable(o)
let h=s.getTag(l)
m(h)||e.updateWith(new ve(h,s,l))})
class ve extends J{constructor(e,t,s){super(),this.tag=e,this.manager=t,this.modifier=s,this.type="update-modifier",this.lastUpdated=e.value()}evaluate(e){let{manager:t,modifier:s,tag:n,lastUpdated:i}=this
n.validate(i)||(e.env.scheduleUpdateModifier(s,t),this.lastUpdated=n.value())}}q.add(35,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.constants.getString(s),a=n?e.constants.getString(n):null
e.elements().setStaticAttribute(i,r,a)}),q.add(36,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.stack.pop(),a=r.value(),l=n?e.constants.getString(n):null,o=e.elements().setDynamicAttribute(i,a,!!s,l)
d(r)||e.updateWith(new ke(r,o))})
class ke extends J{constructor(e,t){super(),this.reference=e,this.attribute=t,this.type="patch-element",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(e){let{attribute:t,reference:s,tag:n}=this
n.validate(this.lastRevision)||(this.lastRevision=n.value(),t.update(s.value(),e.env))}}function we(e,t,s){return e.lookupComponentDefinition(t,s)}class Se{constructor(e,t,s,n){this.inner=e,this.resolver=t,this.meta=s,this.args=n,this.tag=e.tag,this.lastValue=null,this.lastDefinition=null}value(){let{inner:e,lastValue:t}=this,s=e.value()
if(s===t)return this.lastDefinition
let n=null
if(he(s))n=s
else if("string"==typeof s&&s){let{resolver:e,meta:t}=this
n=we(e,s,t)}return n=this.curry(n),this.lastValue=s,this.lastDefinition=n,n}get(){return te}curry(e){let{args:t}=this
return!t&&he(e)?e:e?new ue(e,t):null}}class Ce{constructor(e){this.list=e,this.tag=b(e),this.list=e}value(){let e=[],{list:t}=this
for(let s=0;s<t.length;s++){let n=ce(t[s].value())
n&&e.push(n)}return 0===e.length?null:e.join(" ")}}function _e(e){return 0|(e.dynamicLayout?1:0)|(e.dynamicTag?2:0)|(e.prepareArgs?4:0)|(e.createArgs?8:0)|(e.attributeHook?16:0)|(e.elementHook?32:0)|(e.dynamicScope?64:0)|(e.createCaller?128:0)|(e.updateHook?256:0)|(e.createInstance?512:0)}function Ee(e,t){return!!(e&t)}q.add(69,e=>{let t=e.stack,s=t.pop()
t.push(fe.create(s))}),q.add(70,e=>{let t=e.stack,s=t.peek()
t.push(new be(s))}),q.add(71,(e,{op1:t})=>{let s=e.stack,n=s.pop(),i=s.pop(),r=e.constants.getSerializable(t),a=e.constants.resolver
e.loadValue(X.v0,new Se(n,a,r,i))}),q.add(72,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),{manager:n}=s,i=_e(n.getCapabilities(s.state)),r={definition:s,manager:n,capabilities:i,state:null,handle:null,table:null,lookup:null}
e.stack.push(r)}),q.add(75,(t,{op1:s})=>{let n,i=t.stack,r=i.pop().value(),a=t.constants.getSerializable(s)
if(t.loadValue(X.t1,null),"string"==typeof r){let{constants:{resolver:e}}=t
n=we(e,r,a)}else{if(!he(r))throw e()
n=r}i.push(n)}),q.add(73,e=>{let t,s,{stack:n}=e,i=n.pop()
he(i)?s=t=null:t=_e((s=i.manager).getCapabilities(i.state)),n.push({definition:i,capabilities:t,manager:s,state:null,handle:null,table:null})}),q.add(74,(t,{op1:s})=>{let n,i=t.stack,r=i.pop().value()
if(!he(r))throw e()
n=r,i.push(n)}),q.add(76,(e,{op1:t,op2:s})=>{let n=e.stack,i=e.constants.getStringArray(t),r=s>>4,a=8&s,l=[]
4&s&&l.push("main"),2&s&&l.push("else"),1&s&&l.push("attrs"),e.args.setup(n,i,l,r,!!a),n.push(e.args)}),q.add(77,e=>{let{stack:t}=e
t.push(e.args.empty(t))}),q.add(80,e=>{let t=e.stack,s=t.pop().capture()
t.push(s)}),q.add(79,(e,{op1:t})=>{let s=e.stack,n=e.fetchValue(t),i=s.pop(),{definition:r}=n
he(r)&&(r=function(e,t,s){let n=e.definition=t.unwrap(s),{manager:i,state:r}=n
return e.manager=i,e.capabilities=_e(i.getCapabilities(r)),n}(n,r,i))
let{manager:a,state:l}=r
if(!0!==Ee(n.capabilities,4))return void s.push(i)
let o=i.blocks.values,h=i.blocks.names,u=a.prepareArgs(l,i)
if(u){i.clear()
for(let i=0;i<o.length;i++)s.push(o[i])
let{positional:e,named:t}=u,n=e.length
for(let i=0;i<n;i++)s.push(e[i])
let r=Object.keys(t)
for(let i=0;i<r.length;i++)s.push(t[r[i]])
i.setup(s,r,h,n,!0)}s.push(i)}),q.add(81,(e,{op1:t,op2:s})=>{let n=e.fetchValue(s),{definition:i,manager:r}=n,a=n.capabilities=_e(r.getCapabilities(i.state)),l=null
Ee(a,64)&&(l=e.dynamicScope())
let o=1&t,h=null
Ee(a,8)&&(h=e.stack.peek())
let u=null
Ee(a,128)&&(u=e.getSelf())
let c=r.create(e.env,i.state,h,l,u,!!o)
n.state=c
let p=r.getTag(c)
Ee(a,256)&&!m(p)&&e.updateWith(new Te(p,c,r,l))}),q.add(82,(e,{op1:t})=>{let{manager:s,state:n}=e.fetchValue(t),i=s.getDestructor(n)
i&&e.newDestroyable(i)}),q.add(91,e=>{e.beginCacheGroup(),e.elements().pushSimpleBlock()}),q.add(83,e=>{e.loadValue(X.t0,new xe)}),q.add(37,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.stack.pop(),a=n?e.constants.getString(n):null
e.fetchValue(X.t0).setAttribute(i,r,!!s,a)})
class xe{constructor(){this.attributes=s(),this.classes=[]}setAttribute(e,t,s,n){let i={value:t,namespace:n,trusting:s}
"class"===e&&this.classes.push(t),this.attributes[e]=i}flush(e){for(let t in this.attributes){let s=this.attributes[t],{value:n,namespace:i,trusting:r}=s
if("class"===t&&(n=new Ce(this.classes)),"type"===t)continue
let a=e.elements().setDynamicAttribute(t,n.value(),r,i)
d(n)||e.updateWith(new ke(n,a))}if("type"in this.attributes){let t=this.attributes.type,{value:s,namespace:n,trusting:i}=t,r=e.elements().setDynamicAttribute("type",s.value(),i,n)
d(s)||e.updateWith(new ke(s,r))}}}function Ae(e,t,s,n,i){let r=s.table.symbols.indexOf(e),a=n.get(t);-1!==r&&i.scope().bindBlock(r+1,a),s.lookup&&(s.lookup[e]=a)}q.add(93,(e,{op1:t})=>{let{definition:s,state:n}=e.fetchValue(t),{manager:i}=s,r=e.fetchValue(X.t0)
i.didCreateElement(n,e.elements().expectConstructing("DidCreateElementOpcode#evaluate"),r)}),q.add(84,(e,{op1:t})=>{let{definition:s,state:n}=e.fetchValue(t),{manager:i}=s
e.stack.push(i.getSelf(n))}),q.add(85,(e,{op1:t})=>{let{definition:s,state:n}=e.fetchValue(t),{manager:i}=s
e.stack.push(i.getTagName(n))}),q.add(86,(t,{op1:s})=>{let n,i=t.fetchValue(s),{manager:r,definition:a}=i,{constants:{resolver:l},stack:o}=t,{state:h,capabilities:u}=i,{state:c}=a
if(function(e,t){return!1===Ee(e,1)}(u))n=r.getLayout(c,l)
else{if(!function(e,t){return!0===Ee(e,1)}(u))throw e()
n=r.getDynamicLayout(h,l)}o.push(n.symbolTable),o.push(n.handle)}),q.add(68,(e,{op1:t})=>{let s=e.stack.pop(),n=e.stack.pop(),{manager:i}=s,r=_e(i.getCapabilities(s.state)),a={definition:s,manager:i,capabilities:r,state:null,handle:n.handle,table:n.symbolTable,lookup:null}
e.loadValue(t,a)}),q.add(89,(e,{op1:t})=>{let{stack:s}=e,n=s.pop(),i=s.pop(),r=e.fetchValue(t)
r.handle=n,r.table=i}),q.add(21,(e,{op1:t})=>{let{symbols:s}=e.fetchValue(t).table
e.pushRootScope(s.length+1,!0)}),q.add(87,(e,{op1:t})=>{let n=e.fetchValue(t)
if(n.table.hasEval){let t=n.lookup=s()
e.scope().bindEvalScope(t)}}),q.add(2,(e,{op1:t})=>{let s=e.fetchValue(t),n=e.scope(),i=e.stack.peek(),r=i.named.atNames
for(let a=r.length-1;a>=0;a--){let e=r[a],t=s.table.symbols.indexOf(r[a]),l=i.named.get(e,!1);-1!==t&&n.bindSymbol(t+1,l),s.lookup&&(s.lookup[e]=l)}}),q.add(3,(e,{op1:t})=>{let s=e.fetchValue(t),{blocks:n}=e.stack.peek()
Ae("&attrs","attrs",s,n,e),Ae("&inverse","else",s,n,e),Ae("&default","main",s,n,e)}),q.add(90,(e,{op1:t})=>{let s=e.fetchValue(t)
e.call(s.handle)}),q.add(94,(e,{op1:t})=>{let{manager:s,state:n}=e.fetchValue(t),i=e.elements().popBlock()
s.didRenderLayout(n,i),e.env.didCreate(n,s),e.updateWith(new Ne(s,n,i))}),q.add(92,e=>{e.commitCacheGroup()})
class Te extends J{constructor(e,t,s,n){super(),this.tag=e,this.component=t,this.manager=s,this.dynamicScope=n,this.type="update-component"}evaluate(e){let{component:t,manager:s,dynamicScope:n}=this
s.update(t,n)}}class Ne extends J{constructor(e,t,s){super(),this.manager=e,this.component=t,this.bounds=s,this.type="did-update-layout",this.tag=u}evaluate(e){let{manager:t,component:s,bounds:n}=this
t.didUpdateLayout(s,n),e.env.didUpdate(s,t)}}let Oe=function(e,t){console.info("Use `context`, and `get(<path>)` to debug this template."),t("this")}
class Be{constructor(e,t,n){this.scope=e,this.locals=s()
for(let s=0;s<n.length;s++){let i=n[s],r=t[i-1],a=e.getSymbol(i)
this.locals[r]=a}}get(e){let t,{scope:s,locals:n}=this,i=e.split("."),[r,...a]=e.split("."),l=s.getEvalScope()
return"this"===r?t=s.getSelf():n[r]?t=n[r]:0===r.indexOf("@")&&l[r]?t=l[r]:(t=this.scope.getSelf(),a=i),a.reduce((e,t)=>e.get(t),t)}}q.add(97,(e,{op1:t,op2:s})=>{let n=e.constants.getStringArray(t),i=e.constants.getArray(s),r=new Be(e.scope(),n,i)
Oe(e.getSelf().value(),e=>r.get(e).value())}),q.add(95,(e,{op1:t,op2:s,op3:n})=>{let{constants:i,constants:{resolver:r},stack:a}=e,l=a.pop().value(),o=i.getSerializable(t),h=i.getStringArray(s),u=i.getArray(n),c=r.lookupPartial(l,o),p=r.resolve(c),{symbolTable:d,handle:m}=p.getPartial()
{let t=d.symbols,s=e.scope(),n=e.pushRootScope(t.length,!1),i=s.getEvalScope()
n.bindCallerScope(s.getCallerScope()),n.bindEvalScope(i),n.bindSelf(s.getSelf())
let r=Object.create(s.getPartialMap())
for(let e=0;e<u.length;e++){let t=u[e],n=h[t-1],i=s.getSymbol(t)
r[n]=i}if(i)for(let e=0;e<t.length;e++){let s=e+1,r=i[t[e]]
void 0!==r&&n.bind(s,r)}n.bindPartialMap(r),e.pushFrame(),e.call(m)}})
class Le{constructor(e){this.tag=e.tag,this.artifacts=e}value(){return!this.artifacts.isEmpty()}}q.add(66,e=>{let t=e.stack,s=t.pop(),n=t.pop(),i=e.env.iterableFor(s,n.value()),r=new M(i)
t.push(r),t.push(new Le(r.artifacts))}),q.add(64,(e,{op1:t})=>{e.enterList(t)}),q.add(65,e=>{e.exitList()}),q.add(67,(e,{op1:t})=>{let s=e.stack.peek().next()
if(s){let t=e.iterate(s.memo,s.value)
e.enterItem(s.key,t)}else e.goto(t)})
class De{constructor(e,t,s){this.parentNode=e,this.first=t,this.last=s}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}const Me="http://www.w3.org/2000/svg"
function Ie(e,t,s){if(!e)return t
if(!function(e,t){let s=e.createElementNS(t,"svg")
try{s.insertAdjacentHTML("beforeend","<circle></circle>")}catch(n){}finally{return 1!==s.childNodes.length||s.firstChild.namespaceURI!==Me}}(e,s))return t
let n=e.createElement("div")
return class extends t{insertHTMLBefore(e,t,i){return null===i||""===i?super.insertHTMLBefore(e,t,i):e.namespaceURI!==s?super.insertHTMLBefore(e,t,i):function(e,t,s,n){let i="<svg>"+s+"</svg>"
t.innerHTML=i
let[r,a]=function(e,t,s){let n=e.firstChild,i=null,r=n
for(;r;)i=r,r=r.nextSibling,t.insertBefore(i,s)
return[n,i]}(t.firstChild,e,n)
return new De(e,r,a)}(e,n,i,t)}}}function Re(e,t){return e&&function(e){let t=e.createElement("div")
if(t.innerHTML="first",t.insertAdjacentHTML("beforeend","second"),2===t.childNodes.length)return!1
return!0}(e)?class extends t{constructor(e){super(e),this.uselessComment=e.createComment("")}insertHTMLBefore(e,t,s){if(null===s)return super.insertHTMLBefore(e,t,s)
let n=!1,i=t?t.previousSibling:e.lastChild
i&&i instanceof Text&&(n=!0,e.insertBefore(this.uselessComment,t))
let r=super.insertHTMLBefore(e,t,s)
return n&&e.removeChild(this.uselessComment),r}}:t}const Fe="http://www.w3.org/2000/svg",Ve={foreignObject:1,desc:1,title:1},He=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(e=>He[e]=1)
let je="undefined"==typeof document?null:document
class Pe{constructor(e){this.document=e,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(e,t){let s,n
if(t?(s=t.namespaceURI===Fe||"svg"===e,n=Ve[t.tagName]):(s="svg"===e,n=!1),s&&!n){if(He[e])throw new Error(`Cannot create a ${e} inside an SVG context`)
return this.document.createElementNS(Fe,e)}return this.document.createElement(e)}insertBefore(e,t,s){e.insertBefore(t,s)}insertHTMLBefore(e,t,s){return function(e,t,s,n){let i,r=t,a=s,l=a?a.previousSibling:r.lastChild
if(null===n||""===n)return new De(r,null,null)
null===a?(r.insertAdjacentHTML("beforeend",n),i=r.lastChild):a instanceof HTMLElement?(a.insertAdjacentHTML("beforebegin",n),i=a.previousSibling):(r.insertBefore(e,a),e.insertAdjacentHTML("beforebegin",n),i=e.previousSibling,r.removeChild(e))
let o=l?l.nextSibling:r.firstChild
return new De(r,o,i)}(this.uselessElement,e,t,s)}createTextNode(e){return this.document.createTextNode(e)}createComment(e){return this.document.createComment(e)}}var ze;(function(e){class t extends Pe{createElementNS(e,t){return this.document.createElementNS(e,t)}setAttribute(e,t,s,n=null){n?e.setAttributeNS(n,t,s):e.setAttribute(t,s)}}e.TreeConstruction=t
let s=t
s=Re(je,s),s=Ie(je,s,Fe),e.DOMTreeConstruction=s})(ze||(ze={}))
let Ue=class extends Pe{constructor(e){super(e),this.document=e,this.namespace=null}setAttribute(e,t,s){e.setAttribute(t,s)}removeAttribute(e,t){e.removeAttribute(t)}insertAfter(e,t,s){this.insertBefore(e,t,s.nextSibling)}}
Ue=Re(je,Ue),Ue=Ie(je,Ue,Fe)
ze.DOMTreeConstruction
class $e{constructor(e,t,s=t.length){this.tag=e,this.references=t,this.length=s}static empty(){return new $e(u,n,0)}at(e){return this.references[e]}value(){return this.references.map(this.valueOf)}get(e){let{references:t,length:s}=this
if("length"===e)return Q.create(s)
{let n=parseInt(e,10)
return n<0||n>=s?te:t[n]}}valueOf(e){return e.value()}}new class{constructor(e,t,s){this.tag=e,this.names=t,this.references=s,this.length=t.length,this._map=null}get map(){let e=this._map
if(!e){let{names:t,references:n}=this
e=this._map=s()
for(let s=0;s<t.length;s++)e[t[s]]=n[s]}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let{names:t,references:s}=this,n=t.indexOf(e)
return-1===n?te:s[n]}value(){let{names:e,references:t}=this,n=s()
for(let s=0;s<e.length;s++)n[e[s]]=t[s].value()
return n}}(u,n,n),new $e(u,n)
class We{get(e){return qe.create(this,e)}}class Ge extends We{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let{tag:e,_lastRevision:t,_lastValue:s}=this
return t&&e.validate(t)||(s=this._lastValue=this.compute(),this._lastRevision=e.value()),s}}class Ye extends N{constructor(){super(...arguments),this.children=s()}get(e){let t=this.children[e]
return t||(t=this.children[e]=new Ke(this.inner,e)),t}}class qe extends Ge{static create(e,t){return d(e)?new Ke(e.value(),t):new Je(e,t)}get(e){return new Je(this,e)}}class Ke extends qe{constructor(e,t){super(),this._parentValue=e,this._propertyKey=t,this.tag=U(e,t)}compute(){return this._parentValue[this._propertyKey]}}class Je extends qe{constructor(e,t){super()
let s=e.tag,n=_.create(u)
this._parentReference=e,this._parentObjectTag=n,this._propertyKey=t,this.tag=v([s,n])}compute(){let{_parentReference:e,_parentObjectTag:t,_propertyKey:s}=this,n=e.value()
return t.inner.update(U(n,s)),"string"==typeof n&&"length"===s?n.length:"object"==typeof n&&n?n[s]:void 0}}class Xe extends We{constructor(e){super(),this.tag=f.create(),this._value=e}value(){return this._value}update(e){let{_value:t}=this
e!==t&&(this.tag.inner.dirty(),this._value=e)}}class Qe{constructor(e,t,s,n){let i=e.ComponentClass,r=e.name
this.args=t
let a={debugName:r,args:this.namedArgsSnapshot()}
n.setOwner(a,s),i&&(this.component=i.create(a))}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}const Ze=new Ye(null)
class et{static create(e){return new et(e)}constructor(e){this.env=e.env}prepareArgs(e,t){return null}getCapabilities(e){return e.capabilities}getLayout({name:e,handle:t,symbolTable:s},n){return t&&s?{handle:t,symbolTable:s}:n.compileTemplate(e,t)}create(e,t,s,n,i,r){if(t.ComponentClass){let e=this.env.getOwner()
return new Qe(t,s.capture(),e,this.env)}}getSelf(e){return e?new Ye(e.component):Ze}didCreateElement(e,t){}didRenderLayout(e,t){e&&(e.component.bounds=new Y(t))}didCreate(e){e&&e.component.didInsertElement()}getTag(e){return e?e.tag:u}update(e,t){e&&(e.component.args=e.namedArgsSnapshot())}didUpdateLayout(){}didUpdate(e){e&&e.component.didUpdate()}getDestructor(e){return e?e.component:tt}}const tt={destroy(){}}
class st{constructor(e,t=null){this._registry=e,this._resolver=t,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(e){let t=this._factoryDefinitionLookups[e]
if(t||(this._resolver&&(t=this._resolver.retrieve(e)),t||(t=this._registry.registration(e)),t&&(this._factoryDefinitionLookups[e]=t)),t)return this.buildFactory(e,t)}lookup(e){let t=!1!==this._registry.registeredOption(e,"singleton")
if(t&&this._lookups[e])return this._lookups[e]
let s=this.factoryFor(e)
if(!s)return
if(!1===this._registry.registeredOption(e,"instantiate"))return s.class
let n=s.create()
return t&&n&&(this._lookups[e]=n),n}defaultInjections(e){return{}}buildInjections(e){let t,s=this.defaultInjections(e),n=this._registry.registeredInjections(e)
for(let i=0;i<n.length;i++)s[(t=n[i]).property]=this.lookup(t.source)
return s}buildFactory(e,t){let s=this.buildInjections(e)
return{class:t,create(e){let n=Object.assign({},s,e)
return t.create(n)}}}}class nt{constructor(e){this._registrations={},this._registeredOptions={},this._registeredInjections={},e&&e.fallback&&(this._fallback=e.fallback)}register(e,t,s){this._registrations[e]=t,s&&(this._registeredOptions[e]=s)}registration(e){let t=this._registrations[e]
return void 0===t&&this._fallback&&(t=this._fallback.registration(e)),t}unregister(e){delete this._registrations[e],delete this._registeredOptions[e],delete this._registeredInjections[e]}registerOption(e,t,s){let n=this._registeredOptions[e]
n||(n={},this._registeredOptions[e]=n),n[t]=s}registeredOption(e,t){let s,n=this.registeredOptions(e)
return n&&(s=n[t]),void 0===s&&void 0!==this._fallback&&(s=this._fallback.registeredOption(e,t)),s}registeredOptions(e){let t=this._registeredOptions[e]
if(void 0===t){let[s]=e.split(":")
t=this._registeredOptions[s]}return t}unregisterOption(e,t){let s=this._registeredOptions[e]
s&&delete s[t]}registerInjection(e,t,s){let n=this._registeredInjections[e]
void 0===n&&(this._registeredInjections[e]=n=[]),n.push({property:t,source:s})}registeredInjections(e){let[t]=e.split(":"),s=this._fallback?this._fallback.registeredInjections(e):[]
return Array.prototype.push.apply(s,this._registeredInjections[t]),Array.prototype.push.apply(s,this._registeredInjections[e]),s}}const it="__owner__"
function rt(e){return e[it]}function at(e,t){e[it]=t}function lt(e="unreachable"){return new Error(e)}function ot(e,t){if(!e)throw new Error(t||"assertion failure")}const{keys:ht}=Object
function ut(e){for(let t=1;t<arguments.length;t++){let s=arguments[t]
if(null===s||"object"!=typeof s)continue
let n=ht(s)
for(let t=0;t<n.length;t++){let i=n[t]
e[i]=s[i]}}return e}let ct=0
function pt(e){return e._guid=++ct}function dt(){return Object.create(null)}class mt{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(e){this.current=e,this.stack.push(e)}pop(){let e=this.stack.pop(),t=this.stack.length
return this.current=0===t?null:this.stack[t-1],void 0===e?null:e}isEmpty(){return 0===this.stack.length}}class gt{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e.next}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=t.next}insertBefore(e,t=null){return null===t?this.append(e):(t.prev?t.prev.next=e:this._head=e,e.prev=t.prev,e.next=t,t.prev=e,e)}append(e){let t=this._tail
return t?(t.next=e,e.prev=t,e.next=null):this._head=e,this._tail=e}remove(e){return e.prev?e.prev.next=e.next:this._head=e.next,e.next?e.next.prev=e.prev:this._tail=e.prev,e}}class ft{constructor(e,t){this._head=e,this._tail=t}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=this.nextNode(t)}head(){return this._head}tail(){return this._tail}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e===this._tail?null:e.next}}const bt=Object.freeze([])
class yt{constructor(e,t){this._registry=e,this._resolver=t}register(e,t,s){let n=this._toAbsoluteSpecifier(e)
this._registry.register(n,t,s)}registration(e){let t=this._toAbsoluteSpecifier(e)
return this._registry.registration(t)}unregister(e){let t=this._toAbsoluteSpecifier(e)
this._registry.unregister(t)}registerOption(e,t,s){let n=this._toAbsoluteOrTypeSpecifier(e)
this._registry.registerOption(n,t,s)}registeredOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOption(s,t)}registeredOptions(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOptions(t)}unregisterOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
this._registry.unregisterOption(s,t)}registerInjection(e,t,s){let n=this._toAbsoluteOrTypeSpecifier(e),i=this._toAbsoluteSpecifier(s)
this._registry.registerInjection(n,t,i)}registeredInjections(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredInjections(t)}_toAbsoluteSpecifier(e,t){return this._resolver.identify(e,t)}_toAbsoluteOrTypeSpecifier(e){return function(e){return-1===e.indexOf(":")}(e)?e:this._toAbsoluteSpecifier(e)}}class vt{constructor(e=null){this.bucket=e?ut({},e):{}}get(e){return this.bucket[e]}set(e,t){return this.bucket[e]=t}child(){return new vt(this.bucket)}}const kt=new class{constructor(){this.evaluateOpcode=function(e){let t=new Array(e)
for(let s=0;s<e;s++)t[s]=null
return t}(98).slice()}add(e,t,s="syscall"){this.evaluateOpcode[e]={syscall:"syscall"===s,evaluate:t}}debugBefore(e,t,s){return{sp:void 0,state:void 0}}debugAfter(e,t,s,n){let{sp:i,state:r}=n}evaluate(e,t,s){let n=this.evaluateOpcode[s]
n.syscall?n.evaluate(e,t):n.evaluate(e.inner,t)}}
class wt{constructor(){pt(this)}}class St extends wt{constructor(){super(...arguments),this.next=null,this.prev=null}}var Ct;(function(e){e[e.pc=0]="pc",e[e.ra=1]="ra",e[e.fp=2]="fp",e[e.sp=3]="sp",e[e.s0=4]="s0",e[e.s1=5]="s1",e[e.t0=6]="t0",e[e.t1=7]="t1",e[e.v0=8]="v0"})(Ct||(Ct={}))
class _t extends N{constructor(e){super(e)}static create(e){return void 0===e?At:null===e?Tt:!0===e?Nt:!1===e?Ot:"number"==typeof e?new xt(e):new Et(e)}get(e){return At}}class Et extends _t{constructor(){super(...arguments),this.lengthReference=null}get(e){if("length"===e){let{lengthReference:e}=this
return null===e&&(e=this.lengthReference=new xt(this.inner.length)),e}return super.get(e)}}class xt extends _t{constructor(e){super(e)}}const At=new xt(void 0),Tt=new xt(null),Nt=new xt(!0),Ot=new xt(!1)
class Bt{constructor(e){this.inner=e,this.tag=e.tag}value(){return this.toBool(this.inner.value())}toBool(e){return!!e}}class Lt extends E{constructor(e){super(),this.parts=e,this.tag=b(e)}compute(){let e=new Array
for(let t=0;t<this.parts.length;t++){let s=this.parts[t].value()
null!=s&&(e[t]=Dt(s))}return e.length>0?e.join(""):null}}function Dt(e){return"function"!=typeof e.toString?"":String(e)}kt.add(1,(e,{op1:t})=>{let s=e.stack,n=e.constants.resolveHandle(t)(e,s.pop())
e.loadValue(Ct.v0,n)}),kt.add(6,(e,{op1:t})=>{let s=e.referenceForSymbol(t)
e.stack.push(s)}),kt.add(4,(e,{op1:t})=>{let s=e.stack.pop()
e.scope().bindSymbol(t,s)}),kt.add(5,(e,{op1:t})=>{let s=e.stack.pop(),n=e.stack.pop(),i=e.stack.pop(),r=i?[s,n,i]:null
e.scope().bindBlock(t,r)}),kt.add(96,(e,{op1:t})=>{let s=e.constants.getString(t),n=e.scope().getPartialMap()[s]
void 0===n&&(n=e.getSelf().get(s)),e.stack.push(n)}),kt.add(20,(e,{op1:t,op2:s})=>{e.pushRootScope(t,!!s)}),kt.add(7,(e,{op1:t})=>{let s=e.constants.getString(t),n=e.stack.pop()
e.stack.push(n.get(s))}),kt.add(8,(e,{op1:t})=>{let{stack:s}=e,n=e.scope().getBlock(t)
n?(s.push(n[2]),s.push(n[1]),s.push(n[0])):(s.push(null),s.push(null),s.push(null))}),kt.add(9,(e,{op1:t})=>{let s=!!e.scope().getBlock(t)
e.stack.push(s?Nt:Ot)}),kt.add(10,e=>{e.stack.pop(),e.stack.pop()
let t=e.stack.pop(),s=t&&t.parameters.length
e.stack.push(s?Nt:Ot)}),kt.add(11,(e,{op1:t})=>{let s=new Array(t)
for(let n=t;n>0;n--){s[n-1]=e.stack.pop()}e.stack.push(new Lt(s))})
const Mt="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function It(e){return!(!e||!e[Mt])}class Rt{constructor(e,t){this.inner=e,this.args=t,this[Mt]=!0}unwrap(e){e.realloc(this.offset)
let t=this
for(;;){let{args:s,inner:n}=t
if(s&&(e.positional.prepend(s.positional),e.named.merge(s.named)),!It(n))return n
t=n}}get offset(){let{inner:e,args:t}=this,s=t?t.positional.length:0
return It(e)?s+e.offset:s}}function Ft(e){return Vt(e)?"":String(e)}function Vt(e){return null==e||"function"!=typeof e.toString}function Ht(e){return"object"==typeof e&&null!==e&&"function"==typeof e.toHTML}function jt(e){return"object"==typeof e&&null!==e&&"number"==typeof e.nodeType}function Pt(e){return"string"==typeof e}class zt extends St{constructor(e,t,s){super(),this.node=e,this.reference=t,this.lastValue=s,this.type="dynamic-text",this.tag=t.tag,this.lastRevision=this.tag.value()}evaluate(){let{reference:e,tag:t}=this
t.validate(this.lastRevision)||(this.lastRevision=t.value(),this.update(e.value()))}update(e){let t,{lastValue:s}=this
if(e!==s&&(t=Vt(e)?"":Pt(e)?e:String(e))!==s){this.node.nodeValue=this.lastValue=t}}}class Ut extends Bt{static create(e){return new Ut(e)}toBool(e){return It(e)}}class $t{constructor(e){this.inner=e,this.tag=e.tag}value(){let e=this.inner.value()
return function(e){return Pt(e)||Vt(e)||"boolean"==typeof e||"number"==typeof e}(e)?1:(t=e)&&t[Mt]?0:Ht(e)?3:function(e){return jt(e)&&11===e.nodeType}(e)?4:jt(e)?5:1
var t}}kt.add(28,e=>{let t=e.stack.pop().value(),s=Vt(t)?"":String(t)
e.elements().appendDynamicHTML(s)}),kt.add(29,e=>{let t=e.stack.pop().value().toHTML(),s=Vt(t)?"":t
e.elements().appendDynamicHTML(s)}),kt.add(32,e=>{let t=e.stack.pop(),s=t.value(),n=Vt(s)?"":String(s),i=e.elements().appendDynamicText(n)
d(t)||e.updateWith(new zt(i,t,n))}),kt.add(30,e=>{let t=e.stack.pop().value()
e.elements().appendDynamicFragment(t)}),kt.add(31,e=>{let t=e.stack.pop().value()
e.elements().appendDynamicNode(t)}),kt.add(22,e=>e.pushChildScope()),kt.add(23,e=>e.popScope()),kt.add(44,e=>e.pushDynamicScope()),kt.add(45,e=>e.popDynamicScope()),kt.add(12,(e,{op1:t})=>{e.stack.push(e.constants.getOther(t))}),kt.add(13,(e,{op1:t})=>{let s=e.stack,n=t>>3
switch(7&t){case 0:s.push(n)
break
case 1:s.push(e.constants.getNumber(n))
break
case 2:s.push(e.constants.getString(n))
break
case 3:s.pushEncodedImmediate(t)
break
case 4:case 5:s.push(e.constants.getNumber(n))}}),kt.add(14,e=>{let t=e.stack
t.push(_t.create(t.pop()))}),kt.add(15,e=>{let t=e.stack
t.push(t.peek().value())}),kt.add(16,(e,{op1:t,op2:s})=>{let n=e.fetchValue(t)-s
e.stack.dup(n)}),kt.add(17,(e,{op1:t})=>{e.stack.pop(t)}),kt.add(18,(e,{op1:t})=>{e.load(t)}),kt.add(19,(e,{op1:t})=>{e.fetch(t)}),kt.add(43,(e,{op1:t})=>{let s=e.constants.getArray(t)
e.bindDynamicScope(s)}),kt.add(61,(e,{op1:t})=>{e.enter(t)}),kt.add(62,e=>{e.exit()}),kt.add(48,(e,{op1:t})=>{e.stack.push(e.constants.getSerializable(t))}),kt.add(47,e=>{e.stack.push(e.scope())}),kt.add(46,e=>{let t=e.stack,s=t.pop()
s?t.pushSmi(s.compile()):t.pushNull()}),kt.add(51,e=>{let{stack:t}=e,s=t.pop(),n=t.pop(),i=t.pop(),r=t.pop()
if(null===i)return e.pushFrame(),void e.pushScope(n)
let a=n
{let e=i.parameters,t=e.length
if(t>0){a=a.child()
for(let s=0;s<t;s++)a.bindSymbol(e[s],r.at(s))}}e.pushFrame(),e.pushScope(a),e.call(s)}),kt.add(53,(e,{op1:t})=>{let s=e.stack.pop()
if(d(s))s.value()&&e.goto(t)
else{let n=new x(s)
n.peek()&&e.goto(t),e.updateWith(new Wt(n))}}),kt.add(54,(e,{op1:t})=>{let s=e.stack.pop()
if(d(s))s.value()||e.goto(t)
else{let n=new x(s)
n.peek()||e.goto(t),e.updateWith(new Wt(n))}}),kt.add(55,(e,{op1:t,op2:s})=>{e.stack.peek()===s&&e.goto(t)}),kt.add(56,e=>{let t=e.stack.peek()
d(t)||e.updateWith(Wt.initialize(new x(t)))}),kt.add(63,e=>{let{env:t,stack:s}=e
s.push(t.toConditionalReference(s.pop()))})
class Wt extends St{constructor(e){super(),this.type="assert",this.tag=e.tag,this.cache=e}static initialize(e){let t=new Wt(e)
return e.peek(),t}evaluate(e){let{cache:t}=this
T(t.revalidate())&&e.throw()}}class Gt extends St{constructor(e,t){super(),this.target=t,this.type="jump-if-not-modified",this.tag=e,this.lastRevision=e.value()}evaluate(e){let{tag:t,target:s,lastRevision:n}=this
!e.alwaysRevalidate&&t.validate(n)&&e.goto(s)}didModify(){this.lastRevision=this.tag.value()}}class Yt extends St{constructor(e){super(),this.target=e,this.type="did-modify",this.tag=u}evaluate(){this.target.didModify()}}class qt{constructor(e){this.tag=u,this.type="label",this.label=null,this.prev=null,this.next=null,pt(this),this.label=e}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}kt.add(26,(e,{op1:t})=>{e.elements().appendText(e.constants.getString(t))}),kt.add(27,(e,{op1:t})=>{e.elements().appendComment(e.constants.getString(t))}),kt.add(33,(e,{op1:t})=>{e.elements().openElement(e.constants.getString(t))}),kt.add(34,e=>{let t=e.stack.pop().value()
e.elements().openElement(t)}),kt.add(41,e=>{let t,s,n=e.stack.pop(),i=e.stack.pop(),r=e.stack.pop().value()
if(d(n))t=n.value()
else{let s=new x(n)
t=s.peek(),e.updateWith(new Wt(s))}if(d(i))s=i.value()
else{let t=new x(i)
s=t.peek(),e.updateWith(new Wt(t))}e.elements().pushRemoteElement(t,r,s)}),kt.add(42,e=>{e.elements().popRemoteElement()}),kt.add(38,e=>{let t=e.fetchValue(Ct.t0)
t&&(t.flush(e),e.loadValue(Ct.t0,null)),e.elements().flushElement()}),kt.add(39,e=>{e.elements().closeElement()}),kt.add(40,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),n=e.stack.pop(),{constructing:i,updateOperations:r}=e.elements(),a=e.dynamicScope(),l=s.create(i,n,a,r)
e.env.scheduleInstallModifier(l,s)
let o=s.getDestructor(l)
o&&e.newDestroyable(o)
let h=s.getTag(l)
m(h)||e.updateWith(new Kt(h,s,l))})
class Kt extends St{constructor(e,t,s){super(),this.tag=e,this.manager=t,this.modifier=s,this.type="update-modifier",this.lastUpdated=e.value()}evaluate(e){let{manager:t,modifier:s,tag:n,lastUpdated:i}=this
n.validate(i)||(e.env.scheduleUpdateModifier(s,t),this.lastUpdated=n.value())}}kt.add(35,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.constants.getString(s),a=n?e.constants.getString(n):null
e.elements().setStaticAttribute(i,r,a)}),kt.add(36,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.stack.pop(),a=r.value(),l=n?e.constants.getString(n):null,o=e.elements().setDynamicAttribute(i,a,!!s,l)
d(r)||e.updateWith(new Jt(r,o))})
class Jt extends St{constructor(e,t){super(),this.reference=e,this.attribute=t,this.type="patch-element",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(e){let{attribute:t,reference:s,tag:n}=this
n.validate(this.lastRevision)||(this.lastRevision=n.value(),t.update(s.value(),e.env))}}function Xt(e,t,s){return e.lookupComponentDefinition(t,s)}class Qt{constructor(e,t,s,n){this.inner=e,this.resolver=t,this.meta=s,this.args=n,this.tag=e.tag,this.lastValue=null,this.lastDefinition=null}value(){let{inner:e,lastValue:t}=this,s=e.value()
if(s===t)return this.lastDefinition
let n=null
if(It(s))n=s
else if("string"==typeof s&&s){let{resolver:e,meta:t}=this
n=Xt(e,s,t)}return n=this.curry(n),this.lastValue=s,this.lastDefinition=n,n}get(){return At}curry(e){let{args:t}=this
return!t&&It(e)?e:e?new Rt(e,t):null}}class Zt{constructor(e){this.list=e,this.tag=b(e),this.list=e}value(){let e=[],{list:t}=this
for(let s=0;s<t.length;s++){let n=Ft(t[s].value())
n&&e.push(n)}return 0===e.length?null:e.join(" ")}}function es(e){return 0|(e.dynamicLayout?1:0)|(e.dynamicTag?2:0)|(e.prepareArgs?4:0)|(e.createArgs?8:0)|(e.attributeHook?16:0)|(e.elementHook?32:0)|(e.dynamicScope?64:0)|(e.createCaller?128:0)|(e.updateHook?256:0)|(e.createInstance?512:0)}function ts(e,t){return!!(e&t)}kt.add(69,e=>{let t=e.stack,s=t.pop()
t.push(Ut.create(s))}),kt.add(70,e=>{let t=e.stack,s=t.peek()
t.push(new $t(s))}),kt.add(71,(e,{op1:t})=>{let s=e.stack,n=s.pop(),i=s.pop(),r=e.constants.getSerializable(t),a=e.constants.resolver
e.loadValue(Ct.v0,new Qt(n,a,r,i))}),kt.add(72,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),{manager:n}=s,i=es(n.getCapabilities(s.state)),r={definition:s,manager:n,capabilities:i,state:null,handle:null,table:null,lookup:null}
e.stack.push(r)}),kt.add(75,(e,{op1:t})=>{let s,n=e.stack,i=n.pop().value(),r=e.constants.getSerializable(t)
if(e.loadValue(Ct.t1,null),"string"==typeof i){let{constants:{resolver:t}}=e
s=Xt(t,i,r)}else{if(!It(i))throw lt()
s=i}n.push(s)}),kt.add(73,e=>{let t,s,{stack:n}=e,i=n.pop()
It(i)?s=t=null:t=es((s=i.manager).getCapabilities(i.state)),n.push({definition:i,capabilities:t,manager:s,state:null,handle:null,table:null})}),kt.add(74,(e,{op1:t})=>{let s,n=e.stack,i=n.pop().value()
if(!It(i))throw lt()
s=i,n.push(s)}),kt.add(76,(e,{op1:t,op2:s})=>{let n=e.stack,i=e.constants.getStringArray(t),r=s>>4,a=8&s,l=[]
4&s&&l.push("main"),2&s&&l.push("else"),1&s&&l.push("attrs"),e.args.setup(n,i,l,r,!!a),n.push(e.args)}),kt.add(77,e=>{let{stack:t}=e
t.push(e.args.empty(t))}),kt.add(80,e=>{let t=e.stack,s=t.pop().capture()
t.push(s)}),kt.add(79,(e,{op1:t})=>{let s=e.stack,n=e.fetchValue(t),i=s.pop(),{definition:r}=n
It(r)&&(r=function(e,t,s){let n=e.definition=t.unwrap(s),{manager:i,state:r}=n
return e.manager=i,e.capabilities=es(i.getCapabilities(r)),n}(n,r,i))
let{manager:a,state:l}=r
if(!0!==ts(n.capabilities,4))return void s.push(i)
let o=i.blocks.values,h=i.blocks.names,u=a.prepareArgs(l,i)
if(u){i.clear()
for(let i=0;i<o.length;i++)s.push(o[i])
let{positional:e,named:t}=u,n=e.length
for(let i=0;i<n;i++)s.push(e[i])
let r=Object.keys(t)
for(let i=0;i<r.length;i++)s.push(t[r[i]])
i.setup(s,r,h,n,!0)}s.push(i)}),kt.add(81,(e,{op1:t,op2:s})=>{let n=e.fetchValue(s),{definition:i,manager:r}=n,a=n.capabilities=es(r.getCapabilities(i.state)),l=null
ts(a,64)&&(l=e.dynamicScope())
let o=1&t,h=null
ts(a,8)&&(h=e.stack.peek())
let u=null
ts(a,128)&&(u=e.getSelf())
let c=r.create(e.env,i.state,h,l,u,!!o)
n.state=c
let p=r.getTag(c)
ts(a,256)&&!m(p)&&e.updateWith(new is(p,c,r,l))}),kt.add(82,(e,{op1:t})=>{let{manager:s,state:n}=e.fetchValue(t),i=s.getDestructor(n)
i&&e.newDestroyable(i)}),kt.add(91,e=>{e.beginCacheGroup(),e.elements().pushSimpleBlock()}),kt.add(83,e=>{e.loadValue(Ct.t0,new ss)}),kt.add(37,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.stack.pop(),a=n?e.constants.getString(n):null
e.fetchValue(Ct.t0).setAttribute(i,r,!!s,a)})
class ss{constructor(){this.attributes=dt(),this.classes=[]}setAttribute(e,t,s,n){let i={value:t,namespace:n,trusting:s}
"class"===e&&this.classes.push(t),this.attributes[e]=i}flush(e){for(let t in this.attributes){let s=this.attributes[t],{value:n,namespace:i,trusting:r}=s
if("class"===t&&(n=new Zt(this.classes)),"type"===t)continue
let a=e.elements().setDynamicAttribute(t,n.value(),r,i)
d(n)||e.updateWith(new Jt(n,a))}if("type"in this.attributes){let t=this.attributes.type,{value:s,namespace:n,trusting:i}=t,r=e.elements().setDynamicAttribute("type",s.value(),i,n)
d(s)||e.updateWith(new Jt(s,r))}}}function ns(e,t,s,n,i){let r=s.table.symbols.indexOf(e),a=n.get(t);-1!==r&&i.scope().bindBlock(r+1,a),s.lookup&&(s.lookup[e]=a)}kt.add(93,(e,{op1:t})=>{let{definition:s,state:n}=e.fetchValue(t),{manager:i}=s,r=e.fetchValue(Ct.t0)
i.didCreateElement(n,e.elements().expectConstructing("DidCreateElementOpcode#evaluate"),r)}),kt.add(84,(e,{op1:t})=>{let{definition:s,state:n}=e.fetchValue(t),{manager:i}=s
e.stack.push(i.getSelf(n))}),kt.add(85,(e,{op1:t})=>{let{definition:s,state:n}=e.fetchValue(t),{manager:i}=s
e.stack.push(i.getTagName(n))}),kt.add(86,(e,{op1:t})=>{let s,n=e.fetchValue(t),{manager:i,definition:r}=n,{constants:{resolver:a},stack:l}=e,{state:o,capabilities:h}=n,{state:u}=r
if(function(e,t){return!1===ts(e,1)}(h))s=i.getLayout(u,a)
else{if(!function(e,t){return!0===ts(e,1)}(h))throw lt()
s=i.getDynamicLayout(o,a)}l.push(s.symbolTable),l.push(s.handle)}),kt.add(68,(e,{op1:t})=>{let s=e.stack.pop(),n=e.stack.pop(),{manager:i}=s,r=es(i.getCapabilities(s.state)),a={definition:s,manager:i,capabilities:r,state:null,handle:n.handle,table:n.symbolTable,lookup:null}
e.loadValue(t,a)}),kt.add(89,(e,{op1:t})=>{let{stack:s}=e,n=s.pop(),i=s.pop(),r=e.fetchValue(t)
r.handle=n,r.table=i}),kt.add(21,(e,{op1:t})=>{let{symbols:s}=e.fetchValue(t).table
e.pushRootScope(s.length+1,!0)}),kt.add(87,(e,{op1:t})=>{let s=e.fetchValue(t)
if(s.table.hasEval){let t=s.lookup=dt()
e.scope().bindEvalScope(t)}}),kt.add(2,(e,{op1:t})=>{let s=e.fetchValue(t),n=e.scope(),i=e.stack.peek(),r=i.named.atNames
for(let a=r.length-1;a>=0;a--){let e=r[a],t=s.table.symbols.indexOf(r[a]),l=i.named.get(e,!1);-1!==t&&n.bindSymbol(t+1,l),s.lookup&&(s.lookup[e]=l)}}),kt.add(3,(e,{op1:t})=>{let s=e.fetchValue(t),{blocks:n}=e.stack.peek()
ns("&attrs","attrs",s,n,e),ns("&inverse","else",s,n,e),ns("&default","main",s,n,e)}),kt.add(90,(e,{op1:t})=>{let s=e.fetchValue(t)
e.call(s.handle)}),kt.add(94,(e,{op1:t})=>{let{manager:s,state:n}=e.fetchValue(t),i=e.elements().popBlock()
s.didRenderLayout(n,i),e.env.didCreate(n,s),e.updateWith(new rs(s,n,i))}),kt.add(92,e=>{e.commitCacheGroup()})
class is extends St{constructor(e,t,s,n){super(),this.tag=e,this.component=t,this.manager=s,this.dynamicScope=n,this.type="update-component"}evaluate(e){let{component:t,manager:s,dynamicScope:n}=this
s.update(t,n)}}class rs extends St{constructor(e,t,s){super(),this.manager=e,this.component=t,this.bounds=s,this.type="did-update-layout",this.tag=u}evaluate(e){let{manager:t,component:s,bounds:n}=this
t.didUpdateLayout(s,n),e.env.didUpdate(s,t)}}let as=function(e,t){console.info("Use `context`, and `get(<path>)` to debug this template."),t("this")}
class ls{constructor(e,t,s){this.scope=e,this.locals=dt()
for(let n=0;n<s.length;n++){let i=s[n],r=t[i-1],a=e.getSymbol(i)
this.locals[r]=a}}get(e){let t,{scope:s,locals:n}=this,i=e.split("."),[r,...a]=e.split("."),l=s.getEvalScope()
return"this"===r?t=s.getSelf():n[r]?t=n[r]:0===r.indexOf("@")&&l[r]?t=l[r]:(t=this.scope.getSelf(),a=i),a.reduce((e,t)=>e.get(t),t)}}kt.add(97,(e,{op1:t,op2:s})=>{let n=e.constants.getStringArray(t),i=e.constants.getArray(s),r=new ls(e.scope(),n,i)
as(e.getSelf().value(),e=>r.get(e).value())}),kt.add(95,(e,{op1:t,op2:s,op3:n})=>{let{constants:i,constants:{resolver:r},stack:a}=e,l=a.pop().value(),o=i.getSerializable(t),h=i.getStringArray(s),u=i.getArray(n),c=r.lookupPartial(l,o),p=r.resolve(c),{symbolTable:d,handle:m}=p.getPartial()
{let t=d.symbols,s=e.scope(),n=e.pushRootScope(t.length,!1),i=s.getEvalScope()
n.bindCallerScope(s.getCallerScope()),n.bindEvalScope(i),n.bindSelf(s.getSelf())
let r=Object.create(s.getPartialMap())
for(let e=0;e<u.length;e++){let t=u[e],n=h[t-1],i=s.getSymbol(t)
r[n]=i}if(i)for(let e=0;e<t.length;e++){let s=e+1,r=i[t[e]]
void 0!==r&&n.bind(s,r)}n.bindPartialMap(r),e.pushFrame(),e.call(m)}})
class os{constructor(e){this.tag=e.tag,this.artifacts=e}value(){return!this.artifacts.isEmpty()}}kt.add(66,e=>{let t=e.stack,s=t.pop(),n=t.pop(),i=e.env.iterableFor(s,n.value()),r=new M(i)
t.push(r),t.push(new os(r.artifacts))}),kt.add(64,(e,{op1:t})=>{e.enterList(t)}),kt.add(65,e=>{e.exitList()}),kt.add(67,(e,{op1:t})=>{let s=e.stack.peek().next()
if(s){let t=e.iterate(s.memo,s.value)
e.enterItem(s.key,t)}else e.goto(t)})
class hs{constructor(e,t){this.element=e,this.nextSibling=t}}class us{constructor(e,t,s){this.parentNode=e,this.first=t,this.last=s}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class cs{constructor(e,t){this.parentNode=e,this.node=t}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}function ps(e,t){return new cs(e,t)}function ds(e,t){let s=e.parentElement(),n=e.firstNode(),i=e.lastNode(),r=n
for(;r;){let e=r.nextSibling
if(s.insertBefore(r,t),r===i)return e
r=e}return null}function ms(e){let t=e.parentElement(),s=e.firstNode(),n=e.lastNode(),i=s
for(;i;){let e=i.nextSibling
if(t.removeChild(i),i===n)return e
i=e}return null}const gs="http://www.w3.org/2000/svg"
function fs(e,t,s){if(!e)return t
if(!function(e,t){let s=e.createElementNS(t,"svg")
try{s.insertAdjacentHTML("beforeend","<circle></circle>")}catch(n){}finally{return 1!==s.childNodes.length||s.firstChild.namespaceURI!==gs}}(e,s))return t
let n=e.createElement("div")
return class extends t{insertHTMLBefore(e,t,i){return null===i||""===i?super.insertHTMLBefore(e,t,i):e.namespaceURI!==s?super.insertHTMLBefore(e,t,i):function(e,t,s,n){let i="<svg>"+s+"</svg>"
t.innerHTML=i
let[r,a]=function(e,t,s){let n=e.firstChild,i=null,r=n
for(;r;)i=r,r=r.nextSibling,t.insertBefore(i,s)
return[n,i]}(t.firstChild,e,n)
return new us(e,r,a)}(e,n,i,t)}}}function bs(e,t){return e&&function(e){let t=e.createElement("div")
if(t.innerHTML="first",t.insertAdjacentHTML("beforeend","second"),2===t.childNodes.length)return!1
return!0}(e)?class extends t{constructor(e){super(e),this.uselessComment=e.createComment("")}insertHTMLBefore(e,t,s){if(null===s)return super.insertHTMLBefore(e,t,s)
let n=!1,i=t?t.previousSibling:e.lastChild
i&&i instanceof Text&&(n=!0,e.insertBefore(this.uselessComment,t))
let r=super.insertHTMLBefore(e,t,s)
return n&&e.removeChild(this.uselessComment),r}}:t}const ys="http://www.w3.org/2000/svg",vs={foreignObject:1,desc:1,title:1},ks=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(e=>ks[e]=1)
let ws="undefined"==typeof document?null:document
class Ss{constructor(e){this.document=e,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(e,t){let s,n
if(t?(s=t.namespaceURI===ys||"svg"===e,n=vs[t.tagName]):(s="svg"===e,n=!1),s&&!n){if(ks[e])throw new Error(`Cannot create a ${e} inside an SVG context`)
return this.document.createElementNS(ys,e)}return this.document.createElement(e)}insertBefore(e,t,s){e.insertBefore(t,s)}insertHTMLBefore(e,t,s){return function(e,t,s,n){let i,r=t,a=s,l=a?a.previousSibling:r.lastChild
if(null===n||""===n)return new us(r,null,null)
null===a?(r.insertAdjacentHTML("beforeend",n),i=r.lastChild):a instanceof HTMLElement?(a.insertAdjacentHTML("beforebegin",n),i=a.previousSibling):(r.insertBefore(e,a),e.insertAdjacentHTML("beforebegin",n),i=e.previousSibling,r.removeChild(e))
let o=l?l.nextSibling:r.firstChild
return new us(r,o,i)}(this.uselessElement,e,t,s)}createTextNode(e){return this.document.createTextNode(e)}createComment(e){return this.document.createComment(e)}}var Cs;(function(e){class t extends Ss{createElementNS(e,t){return this.document.createElementNS(e,t)}setAttribute(e,t,s,n=null){n?e.setAttributeNS(n,t,s):e.setAttribute(t,s)}}e.TreeConstruction=t
let s=t
s=bs(ws,s),s=fs(ws,s,ys),e.DOMTreeConstruction=s})(Cs||(Cs={}))
let _s=class extends Ss{constructor(e){super(e),this.document=e,this.namespace=null}setAttribute(e,t,s){e.setAttribute(t,s)}removeAttribute(e,t){e.removeAttribute(t)}insertAfter(e,t,s){this.insertBefore(e,t,s.nextSibling)}}
_s=bs(ws,_s)
var Es=_s=fs(ws,_s,ys)
const xs=Cs.DOMTreeConstruction,As=["javascript:","vbscript:"],Ts=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],Ns=["EMBED"],Os=["href","src","background","action"],Bs=["src"]
function Ls(e,t){return-1!==e.indexOf(t)}function Ds(e,t){return(null===e||Ls(Ts,e))&&Ls(Os,t)}function Ms(e,t){return null!==e&&(Ls(Ns,e)&&Ls(Bs,t))}function Is(e,t){return Ds(e,t)||Ms(e,t)}function Rs(e,t,s,n){let i=null
if(null==n)return n
if(Ht(n))return n.toHTML()
i=t?t.tagName.toUpperCase():null
let r=Ft(n)
if(Ds(i,s)){let t=e.protocolForURL(r)
if(Ls(As,t))return`unsafe:${r}`}return Ms(i,s)?`unsafe:${r}`:r}function Fs(e,t){let s,n
if(t in e)n=t,s="prop"
else{let i=t.toLowerCase()
i in e?(s="prop",n=i):(s="attr",n=t)}return"prop"!==s||"style"!==n.toLowerCase()&&!function(e,t){let s=Vs[e.toUpperCase()]
return s&&s[t.toLowerCase()]||!1}(e.tagName,n)||(s="attr"),{normalized:n,type:s}}const Vs={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0},BUTTON:{form:!0}}
function Hs(e,t,s){let{tagName:n,namespaceURI:i}=e,r={element:e,name:t,namespace:s}
if(i===ys)return js(n,t,r)
let{type:a,normalized:l}=Fs(e,t)
return"attr"===a?js(n,l,r):function(e,t,s){if(Is(e,t))return new $s(t,s)
if(function(e,t){return("INPUT"===e||"TEXTAREA"===e)&&"value"===t}(e,t))return new Gs(t,s)
if(function(e,t){return"OPTION"===e&&"selected"===t}(e,t))return new Ys(t,s)
return new Us(t,s)}(n,l,r)}function js(e,t,s){return Is(e,t)?new Ws(s):new zs(s)}class Ps{constructor(e){this.attribute=e}}class zs extends Ps{set(e,t,s){let n=qs(t)
if(null!==n){let{name:t,namespace:s}=this.attribute
e.__setAttribute(t,n,s)}}update(e,t){let s=qs(e),{element:n,name:i}=this.attribute
null===s?n.removeAttribute(i):n.setAttribute(i,s)}}class Us extends Ps{constructor(e,t){super(t),this.normalizedName=e}set(e,t,s){null!=t&&(this.value=t,e.__setProperty(this.normalizedName,t))}update(e,t){let{element:s}=this.attribute
this.value!==e&&(s[this.normalizedName]=this.value=e,null==e&&this.removeAttribute())}removeAttribute(){let{element:e,namespace:t}=this.attribute
t?e.removeAttributeNS(t,this.normalizedName):e.removeAttribute(this.normalizedName)}}class $s extends Us{set(e,t,s){let{element:n,name:i}=this.attribute,r=Rs(s,n,i,t)
super.set(e,r,s)}update(e,t){let{element:s,name:n}=this.attribute,i=Rs(t,s,n,e)
super.update(i,t)}}class Ws extends zs{set(e,t,s){let{element:n,name:i}=this.attribute,r=Rs(s,n,i,t)
super.set(e,r,s)}update(e,t){let{element:s,name:n}=this.attribute,i=Rs(t,s,n,e)
super.update(i,t)}}class Gs extends Us{set(e,t){e.__setProperty("value",Ft(t))}update(e){let t=this.attribute.element,s=t.value,n=Ft(e)
s!==n&&(t.value=n)}}class Ys extends Us{set(e,t){null!=t&&!1!==t&&e.__setProperty("selected",!0)}update(e){let t=this.attribute.element
t.selected=!!e}}function qs(e){return!1===e||null==e||void 0===e.toString?null:!0===e?"":"function"==typeof e?null:String(e)}class Ks{constructor(e,t,s,n){this.slots=e,this.callerScope=t,this.evalScope=s,this.partialMap=n}static root(e,t=0){let s=new Array(t+1)
for(let n=0;n<=t;n++)s[n]=At
return new Ks(s,null,null,null).init({self:e})}static sized(e=0){let t=new Array(e+1)
for(let s=0;s<=e;s++)t[s]=At
return new Ks(t,null,null,null)}init({self:e}){return this.slots[0]=e,this}getSelf(){return this.get(0)}getSymbol(e){return this.get(e)}getBlock(e){let t=this.get(e)
return t===At?null:t}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(e,t){this.set(e,t)}bindSelf(e){this.set(0,e)}bindSymbol(e,t){this.set(e,t)}bindBlock(e,t){this.set(e,t)}bindEvalScope(e){this.evalScope=e}bindPartialMap(e){this.partialMap=e}bindCallerScope(e){this.callerScope=e}getCallerScope(){return this.callerScope}child(){return new Ks(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(e){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
return this.slots[e]}set(e,t){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
this.slots[e]=t}}class Js{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(e,t){this.createdComponents.push(e),this.createdManagers.push(t)}didUpdate(e,t){this.updatedComponents.push(e),this.updatedManagers.push(t)}scheduleInstallModifier(e,t){this.scheduledInstallManagers.push(t),this.scheduledInstallModifiers.push(e)}scheduleUpdateModifier(e,t){this.scheduledUpdateModifierManagers.push(t),this.scheduledUpdateModifiers.push(e)}didDestroy(e){this.destructors.push(e)}commit(){let{createdComponents:e,createdManagers:t}=this
for(let h=0;h<e.length;h++){let s=e[h]
t[h].didCreate(s)}let{updatedComponents:s,updatedManagers:n}=this
for(let h=0;h<s.length;h++){let e=s[h]
n[h].didUpdate(e)}let{destructors:i}=this
for(let h=0;h<i.length;h++)i[h].destroy()
let{scheduledInstallManagers:r,scheduledInstallModifiers:a}=this
for(let h=0;h<r.length;h++){let e=r[h],t=a[h]
e.install(t)}let{scheduledUpdateModifierManagers:l,scheduledUpdateModifiers:o}=this
for(let h=0;h<l.length;h++){let e=l[h],t=o[h]
e.update(t)}}}class Xs{constructor({appendOperations:e,updateOperations:t}){this._transaction=null,this.appendOperations=e,this.updateOperations=t}toConditionalReference(e){return new Bt(e)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}begin(){this._transaction=new Js}get transaction(){return this._transaction}didCreate(e,t){this.transaction.didCreate(e,t)}didUpdate(e,t){this.transaction.didUpdate(e,t)}scheduleInstallModifier(e,t){this.transaction.scheduleInstallModifier(e,t)}scheduleUpdateModifier(e,t){this.transaction.scheduleUpdateModifier(e,t)}didDestroy(e){this.transaction.didDestroy(e)}commit(){let e=this.transaction
this._transaction=null,e.commit()}attributeFor(e,t,s,n=null){return Hs(e,t,n)}}class Qs{constructor(e,t,s,n,i=-1,r=-1){this.stack=e,this.heap=t,this.program=s,this.externs=n,this.pc=i,this.ra=r,this.currentOpSize=0}pushFrame(){this.stack.pushSmi(this.ra),this.stack.pushSmi(this.stack.fp),this.stack.fp=this.stack.sp-1}popFrame(){this.stack.sp=this.stack.fp-1,this.ra=this.stack.getSmi(0),this.stack.fp=this.stack.getSmi(1)}pushSmallFrame(){this.stack.pushSmi(this.ra)}popSmallFrame(){this.ra=this.stack.popSmi()}goto(e){let t=this.pc+e-this.currentOpSize
this.pc=t}call(e){this.ra=this.pc,this.pc=this.heap.getaddr(e)}returnTo(e){let t=this.pc+e-this.currentOpSize
this.ra=t}return(){this.pc=this.ra}nextStatement(){let{pc:e,program:t}=this
if(-1===e)return null
let{size:s}=this.program.opcode(e),n=this.currentOpSize=s
return this.pc+=n,t.opcode(e)}evaluateOuter(e,t){this.evaluateInner(e,t)}evaluateInner(e,t){e.isMachine?this.evaluateMachine(e):this.evaluateSyscall(e,t)}evaluateMachine(e){switch(e.type){case 57:return this.pushFrame()
case 58:return this.popFrame()
case 59:return this.pushSmallFrame()
case 60:return this.popSmallFrame()
case 50:return this.call(e.op1)
case 49:return this.call(this.stack.popSmi())
case 52:return this.goto(e.op1)
case 24:return this.return()
case 25:return this.returnTo(e.op1)}}evaluateSyscall(e,t){kt.evaluate(t,e,e.type)}}class Zs{constructor(e){this.node=e}firstNode(){return this.node}}class en{constructor(e){this.node=e}lastNode(){return this.node}}class tn{constructor(e,t,s){this.constructing=null,this.operations=null,this.cursorStack=new mt,this.blockStack=new mt,this.pushElement(t,s),this.env=e,this.dom=e.getAppendOperations(),this.updateOperations=e.getDOM()}static forInitialRender(e,t){let s=new this(e,t.element,t.nextSibling)
return s.pushSimpleBlock(),s}static resume(e,t,s){let n=new this(e,t.parentElement(),s)
return n.pushSimpleBlock(),n.pushBlockTracker(t),n}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(e){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new sn(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new rn(this.element))}pushBlockList(e){return this.pushBlockTracker(new an(this.element,e))}pushBlockTracker(e,t=!1){let s=this.blockStack.current
return null!==s&&(s.newDestroyable(e),t||s.didAppendBounds(e)),this.__openBlock(),this.blockStack.push(e),e}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(e){let t=this.__openElement(e)
return this.constructing=t,t}__openElement(e){return this.dom.createElement(e,this.element)}flushElement(){let e=this.element,t=this.constructing
this.__flushElement(e,t),this.constructing=null,this.operations=null,this.pushElement(t,null),this.didOpenElement(t)}__flushElement(e,t){this.dom.insertBefore(e,t,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(e,t,s=null){this.__pushRemoteElement(e,t,s)}__pushRemoteElement(e,t,s){this.pushElement(e,s)
let n=new nn(e)
this.pushBlockTracker(n,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(e,t){this.cursorStack.push(new hs(e,t))}didAddDestroyable(e){this.block().newDestroyable(e)}didAppendBounds(e){return this.block().didAppendBounds(e),e}didAppendNode(e){return this.block().didAppendNode(e),e}didOpenElement(e){return this.block().openElement(e),e}willCloseElement(){this.block().closeElement()}appendText(e){return this.didAppendNode(this.__appendText(e))}__appendText(e){let{dom:t,element:s,nextSibling:n}=this,i=t.createTextNode(e)
return t.insertBefore(s,i,n),i}__appendNode(e){return this.dom.insertBefore(this.element,e,this.nextSibling),e}__appendFragment(e){let t=e.firstChild
if(t){let s=function(e,t,s){return new us(e,t,s)}(this.element,t,e.lastChild)
return this.dom.insertBefore(this.element,e,this.nextSibling),s}return ps(this.element,this.__appendComment(""))}__appendHTML(e){return this.dom.insertHTMLBefore(this.element,this.nextSibling,e)}appendDynamicHTML(e){let t=this.trustedContent(e)
this.didAppendBounds(t)}appendDynamicText(e){let t=this.untrustedContent(e)
return this.didAppendNode(t),t}appendDynamicFragment(e){let t=this.__appendFragment(e)
this.didAppendBounds(t)}appendDynamicNode(e){let t=this.__appendNode(e),s=ps(this.element,t)
this.didAppendBounds(s)}trustedContent(e){return this.__appendHTML(e)}untrustedContent(e){return this.__appendText(e)}appendComment(e){return this.didAppendNode(this.__appendComment(e))}__appendComment(e){let{dom:t,element:s,nextSibling:n}=this,i=t.createComment(e)
return t.insertBefore(s,i,n),i}__setAttribute(e,t,s){this.dom.setAttribute(this.constructing,e,t,s)}__setProperty(e,t){this.constructing[e]=t}setStaticAttribute(e,t,s){this.__setAttribute(e,t,s)}setDynamicAttribute(e,t,s,n){let i=this.constructing,r=this.env.attributeFor(i,e,s,n)
return r.set(this,t,this.env),r}}class sn{constructor(e){this.parent=e,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let{destroyables:e}=this
if(e&&e.length)for(let t=0;t<e.length;t++)e[t].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(e){this.didAppendNode(e),this.nesting++}closeElement(){this.nesting--}didAppendNode(e){0===this.nesting&&(this.first||(this.first=new Zs(e)),this.last=new en(e))}didAppendBounds(e){0===this.nesting&&(this.first||(this.first=e),this.last=e)}newDestroyable(e){this.destroyables=this.destroyables||[],this.destroyables.push(e)}finalize(e){this.first||e.appendComment("")}}class nn extends sn{destroy(){super.destroy(),ms(this)}}class rn extends sn{reset(e){let{destroyables:t}=this
if(t&&t.length)for(let n=0;n<t.length;n++)e.didDestroy(t[n])
let s=ms(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,s}}class an{constructor(e,t){this.parent=e,this.boundList=t,this.parent=e,this.boundList=t}destroy(){this.boundList.forEachNode(e=>e.destroy())}parentElement(){return this.parent}firstNode(){let e=this.boundList.head()
return e&&e.firstNode()}lastNode(){let e=this.boundList.tail()
return e&&e.lastNode()}openElement(e){}closeElement(){}didAppendNode(e){}didAppendBounds(e){}newDestroyable(e){}finalize(e){}}class ln{constructor(e=[]){this.vec=e}clone(){return new ln(this.vec.slice())}sliceFrom(e){return new ln(this.vec.slice(e))}slice(e,t){return new ln(this.vec.slice(e,t))}copy(e,t){this.vec[t]=this.vec[e]}writeRaw(e,t){this.vec[e]=t}writeSmi(e,t){var s
this.vec[e]=(s=t)<0?Math.abs(s)<<3|4:s<<3|0}getRaw(e){return this.vec[e]}getSmi(e){return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw new Error("unreachable")}}(this.vec[e])}reset(){this.vec.length=0}len(){return this.vec.length}}const on=2147483648,hn=2147483647
class un{constructor(e=new ln,t=[]){this.inner=e,this.js=t}slice(e,t){let s
return s="number"==typeof e&&"number"==typeof t?this.inner.slice(e,t):"number"==typeof e&&void 0===t?this.inner.sliceFrom(e):this.inner.clone(),new un(s,this.js.slice(e,t))}sliceInner(e,t){let s=[]
for(let n=e;n<t;n++)s.push(this.get(n))
return s}copy(e,t){this.inner.copy(e,t)}write(e,t){if(function(e){let t=typeof e
if(null==e)return!0
switch(t){case"boolean":case"undefined":return!0
case"number":if(e%1!=0)return!1
let s=Math.abs(e)
return!(s>on)
default:return!1}}(t))this.inner.writeRaw(e,pn(t))
else{let s=this.js.length
this.js.push(t),this.inner.writeRaw(e,s|on)}}writeSmi(e,t){this.inner.writeSmi(e,t)}writeImmediate(e,t){this.inner.writeRaw(e,t)}get(e){let t=this.inner.getRaw(e)
return t&on?this.js[t&hn]:function(e){switch(e){case 3:return!1
case 11:return!0
case 19:return null
case 27:return
default:return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw lt()}}(e)}}(t)}getSmi(e){return this.inner.getSmi(e)}reset(){this.inner.reset(),this.js.length=0}get length(){return this.inner.len()}}class cn{constructor(e,t,s){this.stack=e,this.fp=t,this.sp=s}static empty(){return new this(new un,0,-1)}static restore(e){let t=new un
for(let s=0;s<e.length;s++)t.write(s,e[s])
return new this(t,0,e.length-1)}push(e){this.stack.write(++this.sp,e)}pushSmi(e){this.stack.writeSmi(++this.sp,e)}pushImmediate(e){this.stack.writeImmediate(++this.sp,pn(e))}pushEncodedImmediate(e){this.stack.writeImmediate(++this.sp,e)}pushNull(){this.stack.writeImmediate(++this.sp,19)}dup(e=this.sp){this.stack.copy(e,++this.sp)}copy(e,t){this.stack.copy(e,t)}pop(e=1){let t=this.stack.get(this.sp)
return this.sp-=e,t}popSmi(){return this.stack.getSmi(this.sp--)}peek(e=0){return this.stack.get(this.sp-e)}peekSmi(e=0){return this.stack.getSmi(this.sp-e)}get(e,t=this.fp){return this.stack.get(t+e)}getSmi(e,t=this.fp){return this.stack.getSmi(t+e)}set(e,t,s=this.fp){this.stack.write(s+t,e)}slice(e,t){return this.stack.slice(e,t)}sliceArray(e,t){return this.stack.sliceInner(e,t)}capture(e){let t=this.sp+1,s=t-e
return this.stack.sliceInner(s,t)}reset(){this.stack.reset()}toArray(){return this.stack.sliceInner(this.fp,this.sp+1)}}function pn(e){switch(typeof e){case"number":return function(e){return e<0?Math.abs(e)<<3|4:e<<3|0}(e)
case"boolean":return e?11:3
case"object":return 19
case"undefined":return 27
default:throw lt()}}class dn{constructor(e,t,{alwaysRevalidate:s=!1}){this.frameStack=new mt,this.env=e,this.constants=t.constants,this.dom=e.getDOM(),this.alwaysRevalidate=s}execute(e,t){let{frameStack:s}=this
for(this.try(e,t);!s.isEmpty();){let e=this.frame.nextStatement()
null!==e?e.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(e){this.frame.goto(e)}try(e,t){this.frameStack.push(new yn(e,t))}throw(){this.frame.handleException(),this.frameStack.pop()}}class mn extends St{constructor(e,t,s,n,i){super(),this.start=e,this.state=t,this.runtime=s,this.type="block",this.next=null,this.prev=null,this.children=i,this.bounds=n}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(e){e.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.runtime.env.didDestroy(this.bounds)}}class gn extends mn{constructor(e,t,s,n,i){super(e,t,s,n,i),this.type="try",this.tag=this._tag=_.create(u)}didInitializeChildren(){this._tag.inner.update(y(this.children))}evaluate(e){e.try(this.children,this)}handleException(){let{state:e,bounds:t,children:s,start:n,prev:i,next:r,runtime:a}=this
s.clear()
let l=tn.resume(a.env,t,t.reset(a.env)),o=Nn.resume(e,a,l),h=new gt
o.execute(n,t=>{t.stack=cn.restore(e.stack),t.updatingOpcodeStack.push(h),t.updateWith(this),t.updatingOpcodeStack.push(s)}),this.prev=i,this.next=r}}class fn{constructor(e,t){this.opcode=e,this.marker=t,this.didInsert=!1,this.didDelete=!1,this.map=e.map,this.updating=e.children}insert(e,t,s,n){let{map:i,opcode:r,updating:a}=this,l=null,o=null
l=n?(o=i[n]).bounds.firstNode():this.marker
let h=r.vmForInsertion(l),u=null,{start:c}=r
h.execute(c,n=>{i[e]=u=n.iterate(s,t),n.updatingOpcodeStack.push(new gt),n.updateWith(u),n.updatingOpcodeStack.push(u.children)}),a.insertBefore(u,o),this.didInsert=!0}retain(e,t,s){}move(e,t,s,n){let{map:i,updating:r}=this,a=i[e],l=i[n]||null
ds(a,n?l.firstNode():this.marker),r.remove(a),r.insertBefore(a,l)}delete(e){let{map:t}=this,s=t[e]
s.didDestroy(),ms(s),this.updating.remove(s),delete t[e],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class bn extends mn{constructor(e,t,s,n,r,a){super(e,t,s,n,r),this.type="list-block",this.map=dt(),this.lastIterated=i,this.artifacts=a
let l=this._tag=_.create(u)
this.tag=v([a.tag,l])}didInitializeChildren(e=!0){this.lastIterated=this.artifacts.tag.value(),e&&this._tag.inner.update(y(this.children))}evaluate(e){let{artifacts:t,lastIterated:s}=this
if(!t.tag.validate(s)){let{bounds:s}=this,{dom:n}=e,i=n.createComment("")
n.insertAfter(s.parentElement(),i,s.lastNode())
let r=new fn(this,i)
new R({target:r,artifacts:t}).sync(),this.parentElement().removeChild(i)}super.evaluate(e)}vmForInsertion(e){let{bounds:t,state:s,runtime:n}=this,i=tn.forInitialRender(n.env,{element:t.parentElement(),nextSibling:e})
return Nn.resume(s,n,i)}}class yn{constructor(e,t){this.ops=e,this.exceptionHandler=t,this.current=e.head()}goto(e){this.current=e}nextStatement(){let{current:e,ops:t}=this
return e&&(this.current=t.nextNode(e)),e}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class vn{constructor(e,t,s,n){this.env=e,this.program=t,this.updating=s,this.bounds=n}rerender({alwaysRevalidate:e=!1}={alwaysRevalidate:!1}){let{env:t,program:s,updating:n}=this
new dn(t,s,{alwaysRevalidate:e}).execute(n,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),ms(this.bounds)}}class kn{constructor(){this.stack=null,this.positional=new wn,this.named=new Cn,this.blocks=new En}empty(e){let t=e.sp+1
return this.named.empty(e,t),this.positional.empty(e,t),this.blocks.empty(e,t),this}setup(e,t,s,n,i){this.stack=e
let r=this.named,a=t.length,l=e.sp-a+1
r.setup(e,l,a,t,i)
let o=l-n
this.positional.setup(e,o,n)
let h=this.blocks,u=s.length,c=o-3*u
h.setup(e,c,u,s)}get tag(){return b([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(e){return this.positional.at(e)}realloc(e){let{stack:t}=this
if(e>0&&null!==t){let{positional:s,named:n}=this,i=s.base+e
for(let e=s.length+n.length-1;e>=0;e--)t.copy(e+s.base,e+i)
s.base+=e,n.base+=e,t.sp+=e}}capture(){let e=0===this.positional.length?Tn:this.positional.capture(),t=0===this.named.length?An:this.named.capture()
return{tag:this.tag,length:this.length,positional:e,named:t}}clear(){let{stack:e,length:t}=this
t>0&&null!==e&&e.pop(t)}}class wn{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}empty(e,t){this.stack=e,this.base=t,this.length=0,this._tag=u,this._references=bt}setup(e,t,s){this.stack=e,this.base=t,this.length=s,0===s?(this._tag=u,this._references=bt):(this._tag=null,this._references=null)}get tag(){let e=this._tag
return e||(e=this._tag=b(this.references)),e}at(e){let{base:t,length:s,stack:n}=this
return e<0||e>=s?At:n.get(e,t)}capture(){return new Sn(this.tag,this.references)}prepend(e){let t=e.length
if(t>0){let{base:s,length:n,stack:i}=this
this.base=s-=t,this.length=n+t
for(let r=0;r<t;r++)i.set(e.at(r),r,s)
this._tag=null,this._references=null}}get references(){let e=this._references
if(!e){let{stack:t,base:s,length:n}=this
e=this._references=t.sliceArray(s,s+n)}return e}}class Sn{constructor(e,t,s=t.length){this.tag=e,this.references=t,this.length=s}static empty(){return new Sn(u,bt,0)}at(e){return this.references[e]}value(){return this.references.map(this.valueOf)}get(e){let{references:t,length:s}=this
if("length"===e)return _t.create(s)
{let n=parseInt(e,10)
return n<0||n>=s?At:t[n]}}valueOf(e){return e.value()}}class Cn{constructor(){this.base=0,this.length=0,this._references=null,this._names=bt,this._atNames=bt}empty(e,t){this.stack=e,this.base=t,this.length=0,this._references=bt,this._names=bt,this._atNames=bt}setup(e,t,s,n,i){this.stack=e,this.base=t,this.length=s,0===s?(this._references=bt,this._names=bt,this._atNames=bt):(this._references=null,i?(this._names=n,this._atNames=null):(this._names=null,this._atNames=n))}get tag(){return b(this.references)}get names(){let e=this._names
return e||(e=this._names=this._atNames.map(this.toSyntheticName)),e}get atNames(){let e=this._atNames
return e||(e=this._atNames=this._names.map(this.toAtName)),e}has(e){return-1!==this.names.indexOf(e)}get(e,t=!0){let{base:s,stack:n}=this,i=(t?this.names:this.atNames).indexOf(e)
return-1===i?At:n.get(i,s)}capture(){return new _n(this.tag,this.names,this.references)}merge(e){let{length:t}=e
if(t>0){let{names:s,length:n,stack:i}=this,{names:r}=e
Object.isFrozen(s)&&0===s.length&&(s=[])
for(let a=0;a<t;a++){let t=r[a];-1===s.indexOf(t)&&(n=s.push(t),i.push(e.references[a]))}this.length=n,this._references=null,this._names=s,this._atNames=null}}get references(){let e=this._references
if(!e){let{base:t,length:s,stack:n}=this
e=this._references=n.sliceArray(t,t+s)}return e}toSyntheticName(e){return e.slice(1)}toAtName(e){return`@${e}`}}class _n{constructor(e,t,s){this.tag=e,this.names=t,this.references=s,this.length=t.length,this._map=null}get map(){let e=this._map
if(!e){let{names:t,references:s}=this
e=this._map=dt()
for(let n=0;n<t.length;n++){e[t[n]]=s[n]}}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let{names:t,references:s}=this,n=t.indexOf(e)
return-1===n?At:s[n]}value(){let{names:e,references:t}=this,s=dt()
for(let n=0;n<e.length;n++){s[e[n]]=t[n].value()}return s}}class En{constructor(){this.internalValues=null,this.internalTag=null,this.names=bt,this.length=0,this.base=0}empty(e,t){this.stack=e,this.names=bt,this.base=t,this.length=0,this.internalTag=u,this.internalValues=bt}setup(e,t,s,n){this.stack=e,this.names=n,this.base=t,this.length=s,0===s?(this.internalTag=u,this.internalValues=bt):(this.internalTag=null,this.internalValues=null)}get values(){let e=this.internalValues
if(!e){let{base:t,length:s,stack:n}=this
e=this.internalValues=n.sliceArray(t,t+3*s)}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let{base:t,stack:s,names:n}=this,i=n.indexOf(e)
if(-1===n.indexOf(e))return null
let r=s.get(3*i,t),a=s.get(3*i+1,t),l=s.get(3*i+2,t)
return null===l?null:[l,a,r]}capture(){return new xn(this.names,this.values)}}class xn{constructor(e,t){this.names=e,this.values=t,this.length=e.length}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names.indexOf(e)
return-1===t?null:[this.values[3*t+2],this.values[3*t+1],this.values[3*t]]}}const An=new _n(u,bt,bt),Tn=new Sn(u,bt)
class Nn{constructor(e,t,s,n){this.runtime=e,this.elementStack=n,this.dynamicScopeStack=new mt,this.scopeStack=new mt,this.updatingOpcodeStack=new mt,this.cacheGroups=new mt,this.listBlockStack=new mt,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.heap=this.program.heap,this.constants=this.program.constants,this.elementStack=n,this.scopeStack.push(t),this.dynamicScopeStack.push(s),this.args=new kn,this.inner=new Qs(cn.empty(),this.heap,e.program,{debugBefore:e=>kt.debugBefore(this,e,e.type),debugAfter:(e,t)=>{kt.debugAfter(this,e,e.type,t)}})}get stack(){return this.inner.stack}set stack(e){this.inner.stack=e}set currentOpSize(e){this.inner.currentOpSize=e}get currentOpSize(){return this.inner.currentOpSize}get pc(){return this.inner.pc}set pc(e){this.inner.pc=e}get ra(){return this.inner.ra}set ra(e){this.inner.ra=e}get fp(){return this.stack.fp}set fp(e){this.stack.fp=e}get sp(){return this.stack.sp}set sp(e){this.stack.sp=e}fetch(e){this.stack.push(this[Ct[e]])}load(e){this[Ct[e]]=this.stack.pop()}fetchValue(e){return this[Ct[e]]}loadValue(e,t){this[Ct[e]]=t}pushFrame(){this.inner.pushFrame()}popFrame(){this.inner.popFrame()}goto(e){this.inner.goto(e)}call(e){this.inner.call(e)}returnTo(e){this.inner.returnTo(e)}return(){this.inner.return()}static initial(e,t,s,n,i,r){let a=e.heap.scopesizeof(r),l=Ks.root(s,a),o=new Nn({program:e,env:t},l,n,i)
return o.pc=o.heap.getaddr(r),o.updatingOpcodeStack.push(new gt),o}static empty(e,t,s){let n={get:()=>At,set:()=>At,child:()=>n},i=new Nn({program:e,env:t},Ks.root(At,0),n,s)
return i.updatingOpcodeStack.push(new gt),i}static resume({scope:e,dynamicScope:t},s,n){return new Nn(s,e,t,n)}get program(){return this.runtime.program}get env(){return this.runtime.env}capture(e){return{dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(e)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let e=new qt("END"),t=this.updating(),s=this.cacheGroups.pop(),n=s?t.nextNode(s):t.head(),i=t.tail(),r=y(new ft(n,i)),a=new Gt(r,e)
t.insertBefore(a,n),t.append(new Yt(a)),t.append(e)}enter(e){let t=new gt,s=this.capture(e),n=this.elements().pushUpdatableBlock(),i=new gn(this.heap.gethandle(this.pc),s,this.runtime,n,t)
this.didEnter(i)}iterate(e,t){let s=this.stack
s.push(t),s.push(e)
let n=this.capture(2),i=this.elements().pushUpdatableBlock()
return new gn(this.heap.gethandle(this.pc),n,this.runtime,i,new gt)}enterItem(e,t){this.listBlock().map[e]=t,this.didEnter(t)}enterList(e){let t=new gt,s=this.capture(0),n=this.elements().pushBlockList(t),i=this.stack.peek().artifacts,r=this.pc+e-this.currentOpSize,a=this.heap.gethandle(r),l=new bn(a,s,this.runtime,n,t,i)
this.listBlockStack.push(l),this.didEnter(l)}didEnter(e){this.updateWith(e),this.updatingOpcodeStack.push(e.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop(),this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(e){this.updating().append(e)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let e=this.dynamicScope().child()
return this.dynamicScopeStack.push(e),e}pushRootScope(e,t){let s=Ks.sized(e)
return t&&s.bindCallerScope(this.scope()),this.scopeStack.push(s),s}pushScope(e){this.scopeStack.push(e)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(e){this.elements().didAddDestroyable(e)}getSelf(){return this.scope().getSelf()}referenceForSymbol(e){return this.scope().getSymbol(e)}execute(e,t){let s
for(this.pc=this.heap.getaddr(e),t&&t(this);!(s=this.next()).done;);return s.value}next(){let e,{env:t,program:s,updatingOpcodeStack:n,elementStack:i}=this,r=this.inner.nextStatement()
return null!==r?(this.inner.evaluateOuter(r,this),e={done:!1,value:null}):(this.stack.reset(),e={done:!0,value:new vn(t,s,n.pop(),i.popBlock())}),e}bindDynamicScope(e){let t=this.dynamicScope()
for(let s=e.length-1;s>=0;s--){let n=this.constants.getString(e[s])
t.set(n,this.stack.pop())}}}class On{constructor(e){this.vm=e}next(){return this.vm.next()}}class Bn{constructor(e,t){this.position=0,this.array=e,this.keyFor=t}isEmpty(){return 0===this.array.length}next(){let{position:e,array:t,keyFor:s}=this
if(e>=t.length)return null
let n=t[e],i=s(n,e),r=e
return this.position++,{key:i,value:n,memo:r}}}class Ln{constructor(e,t,s){this.position=0,this.keys=e,this.values=t,this.keyFor=s}isEmpty(){return 0===this.keys.length}next(){let{position:e,keys:t,values:s,keyFor:n}=this
if(e>=t.length)return null
let i=s[e],r=t[e],a=n(i,r)
return this.position++,{key:a,value:i,memo:r}}}const Dn=new class{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}
class Mn{constructor(e,t){this.tag=e.tag,this.ref=e,this.keyFor=t}iterate(){let{ref:e,keyFor:t}=this,s=e.value()
if(Array.isArray(s))return s.length>0?new Bn(s,t):Dn
if(null==s)return Dn
if(void 0!==s.forEach){let e=[]
return s.forEach(function(t){e.push(t)}),e.length>0?new Bn(e,t):Dn}if("object"==typeof s){let e=Object.keys(s)
return e.length>0?new Ln(e,e.map(e=>s[e]),t):Dn}throw new Error(`Don't know how to {{#each ${s}}}`)}valueReferenceFor(e){return new Xe(e.value)}updateValueReference(e,t){e.update(t.value)}memoReferenceFor(e){return new Xe(e.memo)}updateMemoReference(e,t){e.update(t.memo)}}class In extends Xs{static create(e={}){return e.document=e.document||self.document,e.appendOperations=e.appendOperations||new xs(e.document),new In(e)}constructor(e){super({appendOperations:e.appendOperations,updateOperations:new Es(e.document||document)}),at(this,rt(e)),this.uselessAnchor=e.document.createElement("a")}protocolForURL(e){return this.uselessAnchor.href=e,this.uselessAnchor.protocol}iterableFor(e,t){let s
if(!t)throw new Error("Must specify a key for #each")
switch(t){case"@index":s=((e,t)=>String(t))
break
case"@primitive":s=(e=>String(e))
break
default:s=(e=>e[t])}return new Mn(e,s)}getOwner(){return rt(this)}setOwner(e,t){at(e,t)}}const Rn="object"==typeof document?document:null
class Fn{constructor(e){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=e.rootName,this.resolver=e.resolver,ot(e.loader,"Must provide a Loader for preparing templates and other metadata required for a Glimmer Application."),ot(e.renderer,"Must provide a Renderer to render the templates produced by the Loader."),ot(e.builder,"Must provide a Builder that is responsible to building DOM."),this.document=e.document||Rn,this.loader=e.loader,this.renderer=e.renderer,this.builder=e.builder}renderComponent(e,t,s=null){let{_roots:n,_self:i}=this
n.push({id:this._rootsIndex++,component:e,parent:t,nextSibling:s}),i&&(i.update({roots:n}),this.scheduleRerender())}async boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),await this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,setTimeout(async()=>{this._scheduled=!1,await this._rerender(),this._rendering=!1},0))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(e){this._initializers.push(e)}initRegistry(){let e=this._registry=new nt,t=new yt(this._registry,this.resolver)
e.register(`environment:/${this.rootName}/main/main`,In),e.registerOption("helper","instantiate",!1),e.registerOption("template","instantiate",!1),e.register(`document:/${this.rootName}/main/main`,this.document),e.registerOption("document","instantiate",!1),e.registerInjection("environment","document",`document:/${this.rootName}/main/main`),e.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let s=this._initializers
for(let n=0;n<s.length;n++)s[n].initialize(t)
this._initialized=!0}initContainer(){this._container=new st(this._registry,this.resolver),this._container.defaultInjections=(e=>{let t={}
return at(t,this),t})}async _render(){let{env:e}=this,t=this._self=new Xe({roots:this._roots}),s=new vt,n=this.builder.getBuilder(e),i=await this.loader.getTemplateIterator(this,e,n,s,t)
try{e.begin(),await this.renderer.render(i),e.commit(),this._didRender()}catch(r){this._didError(r)}}async _rerender(){let{env:e}=this
try{e.begin(),await this.renderer.rerender(),e.commit(),this._didRender()}catch(t){this._didError(t)}}_didRender(){this._rendered=!0
let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[0]())}_didError(e){let t=this._notifiers
this._notifiers=[],t.forEach(t=>t[1](e))}identify(e,t){return this.resolver.identify(e,t)}factoryFor(e,t){return this._container.factoryFor(this.identify(e,t))}lookup(e,t){return this._container.lookup(this.identify(e,t))}}class Vn{constructor(){this.byName=dt(),this.byHandle=dt()}hasName(e){return e in this.byName}getHandle(e){return this.byName[e]}hasHandle(e){return e in this.byHandle}getByHandle(e){return this.byHandle[e]}register(e,t,s){this.byHandle[e]=s,this.byName[t]=e}}class Hn extends Ge{constructor(e,t){super(),this.helper=e,this.tag=t.tag,this.args=t.capture()}compute(){let{helper:e,args:t}=this
return e(t.positional.value(),t.named.value())}}var jn
function Pn(e){return function(t){return Array.isArray(t)&&t[0]===e}}(function(e){e[e.Text=0]="Text",e[e.Append=1]="Append",e[e.Comment=2]="Comment",e[e.Modifier=3]="Modifier",e[e.Block=4]="Block",e[e.Component=5]="Component",e[e.OpenElement=6]="OpenElement",e[e.OpenSplattedElement=7]="OpenSplattedElement",e[e.FlushElement=8]="FlushElement",e[e.CloseElement=9]="CloseElement",e[e.StaticAttr=10]="StaticAttr",e[e.DynamicAttr=11]="DynamicAttr",e[e.AttrSplat=12]="AttrSplat",e[e.Yield=13]="Yield",e[e.Partial=14]="Partial",e[e.DynamicArg=15]="DynamicArg",e[e.StaticArg=16]="StaticArg",e[e.TrustingAttr=17]="TrustingAttr",e[e.Debugger=18]="Debugger",e[e.ClientSideStatement=19]="ClientSideStatement",e[e.Unknown=20]="Unknown",e[e.Get=21]="Get",e[e.MaybeLocal=22]="MaybeLocal",e[e.HasBlock=23]="HasBlock",e[e.HasBlockParams=24]="HasBlockParams",e[e.Undefined=25]="Undefined",e[e.Helper=26]="Helper",e[e.Concat=27]="Concat",e[e.ClientSideExpression=28]="ClientSideExpression"})(jn||(jn={}))
Pn(jn.Modifier),Pn(jn.FlushElement),Pn(jn.Get),Pn(jn.MaybeLocal)
var zn;(function(e){e[e.OpenComponentElement=0]="OpenComponentElement",e[e.DidCreateElement=1]="DidCreateElement",e[e.SetComponentAttrs=2]="SetComponentAttrs",e[e.DidRenderLayout=3]="DidRenderLayout",e[e.Debugger=4]="Debugger"})(zn||(zn={}))
var Un=jn
const $n="&attrs"
class Wn{constructor(e=0){this.offset=e,this.names=dt(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}compile(e,t){let s=e[this.offset],n=this.names[s];(0,this.funcs[n])(e,t)}}let Gn,Yn
function qn(e,t,s){let[,n,i,r]=e
s.expr(i),r?s.dynamicAttr(n,r,t):s.dynamicAttr(n,null,t)}class Kn{constructor(){let{blocks:e,inlines:t}=function(e=new Jn,t=new Xn){return e.add("if",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
i.replayableIf({args:()=>(i.expr(e[0]),i.toBoolean(),1),ifTrue(){i.invokeStaticBlock(s)},ifFalse(){n&&i.invokeStaticBlock(n)}})}),e.add("unless",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
i.replayableIf({args:()=>(i.expr(e[0]),i.toBoolean(),1),ifTrue(){n&&i.invokeStaticBlock(n)},ifFalse(){i.invokeStaticBlock(s)}})}),e.add("with",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
i.replayableIf({args:()=>(i.expr(e[0]),i.dup(),i.toBoolean(),2),ifTrue(){i.invokeStaticBlock(s,1)},ifFalse(){n&&i.invokeStaticBlock(n)}})}),e.add("each",(e,t,s,n,i)=>{i.replayable({args:()=>(t&&"key"===t[0][0]?i.expr(t[1][0]):i.pushPrimitiveReference(null),i.expr(e[0]),2),body(){i.putIterator(),i.jumpUnless("ELSE"),i.pushFrame(),i.dup(Ct.fp,1),i.returnTo("ITER"),i.enterList("BODY"),i.label("ITER"),i.iterate("BREAK"),i.label("BODY"),i.invokeStaticBlock(s,2),i.pop(2),i.jump("FINALLY"),i.label("BREAK"),i.exitList(),i.popFrame(),i.jump("FINALLY"),i.label("ELSE"),n&&i.invokeStaticBlock(n)}})}),e.add("in-element",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
i.replayableIf({args(){let[s,n]=t
for(let e=0;e<s.length;e++){let t=s[e]
if("nextSibling"!==t&&"guid"!==t)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${s[0]}\` option`)
i.expr(n[e])}return i.expr(e[0]),i.dup(),4},ifTrue(){i.pushRemoteElement(),i.invokeStaticBlock(s),i.popRemoteElement()}})}),e.add("-with-dynamic-vars",(e,t,s,n,i)=>{if(t){let[e,n]=t
i.compileParams(n),i.pushDynamicScope(),i.bindDynamicScope(e),i.invokeStaticBlock(s),i.popDynamicScope()}else i.invokeStaticBlock(s)}),e.add("component",(e,t,s,n,i)=>{if("string"==typeof e[0]&&i.staticComponentHelper(e[0],t,s))return
let[r,...a]=e
i.dynamicComponent(r,a,t,!0,s,n)}),t.add("component",(e,t,s,n)=>{let i=t&&t[0]
if("string"==typeof i&&n.staticComponentHelper(i,s,null))return!0
let[r,...a]=t
return n.dynamicComponent(r,a,s,!0,null,null),!0}),{blocks:e,inlines:t}}()
this.blocks=e,this.inlines=t}}class Jn{constructor(){this.names=dt(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t,s,n,i,r){let a=this.names[e]
if(void 0===a){(0,this.missing)(e,t,s,n,i,r)}else{(0,this.funcs[a])(t,s,n,i,r)}}}class Xn{constructor(){this.names=dt(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t){let s,n,i,r=e[1]
if(!Array.isArray(r))return["expr",r]
if(r[0]===Un.Helper)s=r[1],n=r[2],i=r[3]
else{if(r[0]!==Un.Unknown)return["expr",r]
s=r[1],n=i=null}let a=this.names[s]
if(void 0===a&&this.missing){let e=(0,this.missing)(s,n,i,t)
return!1===e?["expr",r]:e}if(void 0!==a){let e=(0,this.funcs[a])(s,n,i,t)
return!1===e?["expr",r]:e}return["expr",r]}}const Qn=-1
class Zn{constructor(e,t){this.compiler=e,this.layout=t,this.compiled=null}get symbolTable(){return this.layout.block}compile(){if(null!==this.compiled)return this.compiled
this.compiled=Qn
let{block:{statements:e}}=this.layout
return this.compiled=this.compiler.add(e,this.layout)}}class ei{constructor(e,t){this.compiler=e,this.parsed=t,this.compiled=null}get symbolTable(){return this.parsed.block}compile(){if(null!==this.compiled)return this.compiled
this.compiled=Qn
let{block:{statements:e},containingLayout:t}=this.parsed
return this.compiled=this.compiler.add(e,t)}}function ti(e,t,s){let n=function(){if(Gn)return Gn
const e=Gn=new Wn
e.add(Un.Text,(e,t)=>{t.text(e[1])}),e.add(Un.Comment,(e,t)=>{t.comment(e[1])}),e.add(Un.CloseElement,(e,t)=>{t.closeElement()}),e.add(Un.FlushElement,(e,t)=>{t.flushElement()}),e.add(Un.Modifier,(e,t)=>{let{referrer:s}=t,[,n,i,r]=e,a=t.compiler.resolveModifier(n,s)
if(null===a)throw new Error(`Compile Error ${n} is not a modifier: Helpers may not be used in the element form.`)
t.modifier(a,i,r)}),e.add(Un.StaticAttr,(e,t)=>{let[,s,n,i]=e
t.staticAttr(s,i,n)}),e.add(Un.DynamicAttr,(e,t)=>{qn(e,!1,t)}),e.add(Un.TrustingAttr,(e,t)=>{qn(e,!0,t)}),e.add(Un.OpenElement,(e,t)=>{t.openPrimitiveElement(e[1])}),e.add(Un.OpenSplattedElement,(e,t)=>{t.setComponentAttrs(!0),t.putComponentOperations(),t.openPrimitiveElement(e[1])}),e.add(Un.Component,(e,t)=>{let[,s,n,i,r]=e,{referrer:a}=t,{handle:l,capabilities:o,compilable:h}=t.compiler.resolveLayoutForTag(s,a)
if(null===l||null===o)throw new Error(`Compile Error: Cannot find component ${s}`)
{let e=[[Un.ClientSideStatement,zn.SetComponentAttrs,!0],...n,[Un.ClientSideStatement,zn.SetComponentAttrs,!1]],s=t.inlineBlock({statements:e,parameters:bt}),a=t.template(r)
h?(t.pushComponentDefinition(l),t.invokeStaticComponent(o,h,s,null,i,!1,a&&a)):(t.pushComponentDefinition(l),t.invokeComponent(o,s,null,i,!1,a&&a))}}),e.add(Un.Partial,(e,t)=>{let[,s,n]=e,{referrer:i}=t
t.replayableIf({args:()=>(t.expr(s),t.dup(),2),ifTrue(){t.invokePartial(i,t.evalSymbols(),n),t.popScope(),t.popFrame()}})}),e.add(Un.Yield,(e,t)=>{let[,s,n]=e
t.yield(s,n)}),e.add(Un.AttrSplat,(e,t)=>{let[,s]=e
t.yield(s,[]),t.setComponentAttrs(!1)}),e.add(Un.Debugger,(e,t)=>{let[,s]=e
t.debugger(t.evalSymbols(),s)}),e.add(Un.ClientSideStatement,(e,s)=>{t.compile(e,s)}),e.add(Un.Append,(e,t)=>{let[,s,n]=e
!0!==(t.compileInline(e)||s)&&t.guardedAppend(s,n)}),e.add(Un.Block,(e,t)=>{let[,s,n,i,r,a]=e,l=t.template(r),o=t.template(a),h=l&&l,u=o&&o
t.compileBlock(s,n,i,h,u)})
const t=new Wn(1)
return t.add(zn.OpenComponentElement,(e,t)=>{t.putComponentOperations(),t.openPrimitiveElement(e[2])}),t.add(zn.DidCreateElement,(e,t)=>{t.didCreateElement(Ct.s0)}),t.add(zn.SetComponentAttrs,(e,t)=>{t.setComponentAttrs(e[2])}),t.add(zn.Debugger,()=>{}),t.add(zn.DidRenderLayout,(e,t)=>{t.didRenderLayout(Ct.s0)}),e}()
for(let i=0;i<e.length;i++)n.compile(e[i],t)
return t.commit()}class si{constructor(e,t,s){this.main=e,this.trustingGuardedAppend=t,this.cautiousGuardedAppend=s}static compile(e){let t=this.std(e,e=>e.main()),s=this.std(e,e=>e.stdAppend(!0)),n=this.std(e,e=>e.stdAppend(!1))
return new si(t,s,n)}static std(e,t){return oi.build(e,t)}getAppend(e){return e?this.trustingGuardedAppend:this.cautiousGuardedAppend}}class ni{constructor(e,t,s){this.macros=e,this.program=t,this.resolver=s,this.initialize()}initialize(){this.stdLib=si.compile(this)}get constants(){return this.program.constants}compileInline(e,t){let{inlines:s}=this.macros
return s.compile(e,t)}compileBlock(e,t,s,n,i,r){let{blocks:a}=this.macros
a.compile(e,t,s,n,i,r)}add(e,t){return ti(e,this.builderFor(t))}commit(e,t){let s=this.program.heap,n=s.malloc()
for(let i=0;i<t.length;i++){let e=t[i]
"function"==typeof e?s.pushPlaceholder(e):s.push(e)}return s.finishMalloc(n,e),n}resolveLayoutForTag(e,t){let{resolver:s}=this,n=s.lookupComponentDefinition(e,t)
return null===n?{handle:null,capabilities:null,compilable:null}:this.resolveLayoutForHandle(n)}resolveLayoutForHandle(e){let{resolver:t}=this,s=t.getCapabilities(e),n=null
return s.dynamicLayout||(n=t.getLayout(e)),{handle:e,capabilities:s,compilable:n}}resolveModifier(e,t){return this.resolver.lookupModifier(e,t)}resolveHelper(e,t){return this.resolver.lookupHelper(e,t)}}class ii{constructor(e,t){this.compiler=e,this.layout=t,this.compiled=null
let{block:s}=t
this.symbolTable={hasEval:s.hasEval,symbols:s.symbols.concat([$n])}}compile(){if(null!==this.compiled)return this.compiled
let{compiler:e,layout:t}=this,s=e.builderFor(t)
s.startLabels(),s.fetch(Ct.s1),s.getComponentTagName(Ct.s0),s.primitiveReference(),s.dup(),s.load(Ct.s1),s.jumpUnless("BODY"),s.fetch(Ct.s1),s.putComponentOperations(),s.openDynamicElement(),s.didCreateElement(Ct.s0),s.flushElement(),s.label("BODY"),s.invokeStaticBlock(function(e,t){return new ei(t,{block:{statements:e.block.statements,parameters:bt},containingLayout:e})}(t,e)),s.fetch(Ct.s1),s.jumpUnless("END"),s.closeElement(),s.label("END"),s.load(Ct.s1),s.stopLabels()
let n=s.commit()
return this.compiled=n}}class ri{constructor(e){this.builder=e}static(e,t){let[s,n,i,r]=t,{builder:a}=this
if(null!==e){let{capabilities:t,compilable:l}=a.compiler.resolveLayoutForHandle(e)
l?(a.pushComponentDefinition(e),a.invokeStaticComponent(t,l,null,s,n,!1,i,r)):(a.pushComponentDefinition(e),a.invokeComponent(t,null,s,n,!1,i,r))}}}class ai{constructor(e){this.buffer=e,this.typePos=0,this.size=0}encode(e,t){if(e>255)throw new Error(`Opcode type over 8-bits. Got ${e}.`)
this.buffer.push(e|t|arguments.length-2<<8),this.typePos=this.buffer.length-1
for(let s=2;s<arguments.length;s++){let e=arguments[s]
if("number"==typeof e&&e>65535)throw new Error(`Operand over 16-bits. Got ${e}.`)
this.buffer.push(e)}this.size=this.buffer.length}patch(e,t){if(-1!==this.buffer[e+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[e+1]=t}patchWith(e,t,s){if(-1!==this.buffer[e+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[e+1]=t,this.buffer[e+2]=s}}class li{constructor(){this.labels=dt(),this.targets=[]}label(e,t){this.labels[e]=t}target(e,t){this.targets.push({at:e,target:t})}patch(e){let{targets:t,labels:s}=this
for(let n=0;n<t.length;n++){let{at:i,target:r}=t[n],a=s[r]-i
e.patch(i,a)}}}class oi{constructor(e,t=0){this.size=t,this.encoder=new ai([]),this.labelsStack=new mt,this.compiler=e}static build(e,t){let s=new oi(e)
return t(s),s.commit()}push(e){switch(arguments.length){case 1:return this.encoder.encode(e,0)
case 2:return this.encoder.encode(e,0,arguments[1])
case 3:return this.encoder.encode(e,0,arguments[1],arguments[2])
default:return this.encoder.encode(e,0,arguments[1],arguments[2],arguments[3])}}pushMachine(e){switch(arguments.length){case 1:return this.encoder.encode(e,1024)
case 2:return this.encoder.encode(e,1024,arguments[1])
case 3:return this.encoder.encode(e,1024,arguments[1],arguments[2])
default:return this.encoder.encode(e,1024,arguments[1],arguments[2],arguments[3])}}commit(){return this.pushMachine(24),this.compiler.commit(this.size,this.encoder.buffer)}reserve(e){this.encoder.encode(e,0,-1)}reserveWithOperand(e,t){this.encoder.encode(e,0,-1,t)}reserveMachine(e){this.encoder.encode(e,1024,-1)}main(){this.push(68,Ct.s0),this.invokePreparedComponent(!1,!1,!0)}appendHTML(){this.push(28)}appendSafeHTML(){this.push(29)}appendDocumentFragment(){this.push(30)}appendNode(){this.push(31)}appendText(){this.push(32)}beginComponentTransaction(){this.push(91)}commitComponentTransaction(){this.push(92)}pushDynamicScope(){this.push(44)}popDynamicScope(){this.push(45)}pushRemoteElement(){this.push(41)}popRemoteElement(){this.push(42)}pushRootScope(e,t){this.push(20,e,t?1:0)}pushVirtualRootScope(e){this.push(21,e)}pushChildScope(){this.push(22)}popScope(){this.push(23)}prepareArgs(e){this.push(79,e)}createComponent(e,t){let s=0|t
this.push(81,s,e)}registerComponentDestructor(e){this.push(82,e)}putComponentOperations(){this.push(83)}getComponentSelf(e){this.push(84,e)}getComponentTagName(e){this.push(85,e)}getComponentLayout(e){this.push(86,e)}setupForEval(e){this.push(87,e)}invokeComponentLayout(e){this.push(90,e)}didCreateElement(e){this.push(93,e)}didRenderLayout(e){this.push(94,e)}pushFrame(){this.pushMachine(57)}popFrame(){this.pushMachine(58)}pushSmallFrame(){this.pushMachine(59)}popSmallFrame(){this.pushMachine(60)}invokeVirtual(){this.pushMachine(49)}invokeYield(){this.push(51)}toBoolean(){this.push(63)}invokePreparedComponent(e,t,s,n=null){this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(Ct.s0,e),n&&n(),this.registerComponentDestructor(Ct.s0),this.getComponentSelf(Ct.s0),this.pushVirtualRootScope(Ct.s0),this.setVariable(0),this.setupForEval(Ct.s0),s&&this.setNamedVariables(Ct.s0),t&&this.setBlocks(Ct.s0),this.pop(),this.invokeComponentLayout(Ct.s0),this.didRenderLayout(Ct.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}compileInline(e){return this.compiler.compileInline(e,this)}compileBlock(e,t,s,n,i){this.compiler.compileBlock(e,t,s,n,i,this)}label(e){this.labels.label(e,this.nextPos)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new li)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushCurriedComponent(){this.push(74)}pushDynamicComponentInstance(){this.push(73)}openDynamicElement(){this.push(34)}flushElement(){this.push(38)}closeElement(){this.push(39)}putIterator(){this.push(66)}enterList(e){this.reserve(64),this.labels.target(this.pos,e)}exitList(){this.push(65)}iterate(e){this.reserve(67),this.labels.target(this.pos,e)}setNamedVariables(e){this.push(2,e)}setBlocks(e){this.push(3,e)}setVariable(e){this.push(4,e)}setBlock(e){this.push(5,e)}getVariable(e){this.push(6,e)}getBlock(e){this.push(8,e)}hasBlock(e){this.push(9,e)}concat(e){this.push(11,e)}load(e){this.push(18,e)}fetch(e){this.push(19,e)}dup(e=Ct.sp,t=0){return this.push(16,e,t)}pop(e=1){return this.push(17,e)}returnTo(e){this.reserveMachine(25),this.labels.target(this.pos,e)}primitiveReference(){this.push(14)}reifyU32(){this.push(15)}enter(e){this.push(61,e)}exit(){this.push(62)}return(){this.pushMachine(24)}jump(e){this.reserveMachine(52),this.labels.target(this.pos,e)}jumpIf(e){this.reserve(53),this.labels.target(this.pos,e)}jumpUnless(e){this.reserve(54),this.labels.target(this.pos,e)}jumpEq(e,t){this.reserveWithOperand(55,e),this.labels.target(this.pos,t)}assertSame(){this.push(56)}pushEmptyArgs(){this.push(77)}switch(e,t){let s=[],n=0
t(function(e,t){s.push({match:e,callback:t,label:`CLAUSE${n++}`})}),this.enter(2),this.assertSame(),this.reifyU32(),this.startLabels(),s.slice(0,-1).forEach(e=>this.jumpEq(e.match,e.label))
for(let i=s.length-1;i>=0;i--){let e=s[i]
this.label(e.label),this.pop(2),e.callback(),0!==i&&this.jump("END")}this.label("END"),this.stopLabels(),this.exit()}stdAppend(e){this.switch(this.contentType(),t=>{t(1,()=>{e?(this.assertSame(),this.appendHTML()):this.appendText()}),t(0,()=>{this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeBareComponent()}),t(3,()=>{this.assertSame(),this.appendSafeHTML()}),t(4,()=>{this.assertSame(),this.appendDocumentFragment()}),t(5,()=>{this.assertSame(),this.appendNode()})})}populateLayout(e){this.push(89,e)}invokeBareComponent(){this.fetch(Ct.s0),this.dup(Ct.sp,1),this.load(Ct.s0),this.pushFrame(),this.pushEmptyArgs(),this.prepareArgs(Ct.s0),this.invokePreparedComponent(!1,!1,!0,()=>{this.getComponentLayout(Ct.s0),this.populateLayout(Ct.s0)}),this.load(Ct.s0)}isComponent(){this.push(69)}contentType(){this.push(70)}pushBlockScope(){this.push(47)}}class hi extends oi{constructor(e,t){super(e,t?t.block.symbols.length:0),this.containingLayout=t,this.component=new ri(this),this.expressionCompiler=function(){if(Yn)return Yn
const e=Yn=new Wn
return e.add(Un.Unknown,(e,t)=>{let{compiler:s,referrer:n,containingLayout:{asPartial:i}}=t,r=e[1],a=s.resolveHelper(r,n)
null!==a?t.helper(a,null,null):i?t.resolveMaybeLocal(r):(t.getVariable(0),t.getProperty(r))}),e.add(Un.Concat,(e,t)=>{let s=e[1]
for(let n=0;n<s.length;n++)t.expr(s[n])
t.concat(s.length)}),e.add(Un.Helper,(e,t)=>{let{compiler:s,referrer:n}=t,[,i,r,a]=e
if("component"===i){let[e,...s]=r
return void t.curryComponent(e,s,a,!0)}let l=s.resolveHelper(i,n)
if(null===l)throw new Error(`Compile Error: ${i} is not a helper`)
t.helper(l,r,a)}),e.add(Un.Get,(e,t)=>{let[,s,n]=e
t.getVariable(s)
for(let i=0;i<n.length;i++)t.getProperty(n[i])}),e.add(Un.MaybeLocal,(e,t)=>{let[,s]=e
if(t.containingLayout.asPartial){let e=s[0]
s=s.slice(1),t.resolveMaybeLocal(e)}else t.getVariable(0)
for(let n=0;n<s.length;n++)t.getProperty(s[n])}),e.add(Un.Undefined,(e,t)=>t.pushPrimitiveReference(void 0)),e.add(Un.HasBlock,(e,t)=>{t.hasBlock(e[1])}),e.add(Un.HasBlockParams,(e,t)=>{t.hasBlockParams(e[1])}),e}(),this.isComponentAttrs=!1,this.constants=e.constants,this.stdLib=e.stdLib}get referrer(){return this.containingLayout&&this.containingLayout.referrer}setComponentAttrs(e){this.isComponentAttrs=e}expr(e){Array.isArray(e)?this.expressionCompiler.compile(e,this):this.pushPrimitiveReference(e)}pushArgs(e,t){let s=this.constants.stringArray(e)
this.push(76,s,t)}pushYieldableBlock(e){this.pushSymbolTable(e&&e.symbolTable),this.pushBlockScope(),this.pushBlock(e)}curryComponent(e,t,s,n){let i=this.containingLayout.referrer
this.pushFrame(),this.compileArgs(t,s,null,n),this.push(80),this.expr(e),this.push(71,this.constants.serializable(i)),this.popFrame(),this.fetch(Ct.v0)}pushSymbolTable(e){if(e){let t=this.constants.serializable(e)
this.push(48,t)}else this.primitive(null)}invokeComponent(e,t,s,n,i,r,a=null,l){this.fetch(Ct.s0),this.dup(Ct.sp,1),this.load(Ct.s0),this.pushFrame()
let o=!!(r||a||t),h=!0===e||e.prepareArgs||!(!n||0===n[0].length),u={main:r,else:a,attrs:t}
this.compileArgs(s,n,u,i),this.prepareArgs(Ct.s0),this.invokePreparedComponent(null!==r,o,h,()=>{l?(this.pushSymbolTable(l.symbolTable),this.pushLayout(l),this.resolveLayout()):this.getComponentLayout(Ct.s0),this.populateLayout(Ct.s0)}),this.load(Ct.s0)}invokeStaticComponent(e,t,s,n,i,r,a,l=null){let{symbolTable:o}=t
if(o.hasEval||e.prepareArgs)return void this.invokeComponent(e,s,n,i,r,a,l,t)
this.fetch(Ct.s0),this.dup(Ct.sp,1),this.load(Ct.s0)
let{symbols:h}=o
e.createArgs&&(this.pushFrame(),this.compileArgs(null,i,null,r)),this.beginComponentTransaction(),e.dynamicScope&&this.pushDynamicScope(),e.createInstance&&this.createComponent(Ct.s0,null!==a),e.createArgs&&this.popFrame(),this.pushFrame(),this.registerComponentDestructor(Ct.s0)
let u=[]
this.getComponentSelf(Ct.s0),u.push({symbol:0,isBlock:!1})
for(let c=0;c<h.length;c++){let e=h[c]
switch(e.charAt(0)){case"&":let t=null
if("&default"===e)t=a
else if("&inverse"===e)t=l
else{if(e!==$n)throw lt()
t=s}t?(this.pushYieldableBlock(t),u.push({symbol:c+1,isBlock:!0})):(this.pushYieldableBlock(null),u.push({symbol:c+1,isBlock:!0}))
break
case"@":if(!i)break
let[n,o]=i,h=e
r&&(h=e.slice(1))
let p=n.indexOf(h);-1!==p&&(this.expr(o[p]),u.push({symbol:c+1,isBlock:!1}))}}this.pushRootScope(h.length+1,!!(a||l||s))
for(let c=u.length-1;c>=0;c--){let{symbol:e,isBlock:t}=u[c]
t?this.setBlock(e):this.setVariable(e)}this.invokeStatic(t),e.createInstance&&this.didRenderLayout(Ct.s0),this.popFrame(),this.popScope(),e.dynamicScope&&this.popDynamicScope(),this.commitComponentTransaction(),this.load(Ct.s0)}dynamicComponent(e,t,s,n,i,r=null){this.replayable({args:()=>(this.expr(e),this.dup(),2),body:()=>{this.jumpUnless("ELSE"),this.resolveDynamicComponent(this.containingLayout.referrer),this.pushDynamicComponentInstance(),this.invokeComponent(!0,null,t,s,n,i,r),this.label("ELSE")}})}yield(e,t){this.compileArgs(t,null,null,!1),this.getBlock(e),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}guardedAppend(e,t){this.pushFrame(),this.expr(e),this.pushMachine(50,this.stdLib.getAppend(t)),this.popFrame()}invokeStaticBlock(e,t=0){let{parameters:s}=e.symbolTable,n=s.length,i=Math.min(t,n)
if(this.pushFrame(),i){this.pushChildScope()
for(let e=0;e<i;e++)this.dup(Ct.fp,t-e),this.setVariable(s[e])}this.pushBlock(e),this.resolveBlock(),this.invokeVirtual(),i&&this.popScope(),this.popFrame()}string(e){return this.constants.string(e)}names(e){let t=[]
for(let s=0;s<e.length;s++){let n=e[s]
t[s]=this.constants.string(n)}return this.constants.array(t)}symbols(e){return this.constants.array(e)}primitive(e){let t,s=0
switch(typeof e){case"number":e%1==0?e>-1?t=e:(t=this.constants.number(e),s=4):(t=this.constants.number(e),s=1)
break
case"string":t=this.string(e),s=2
break
case"boolean":t=0|e,s=3
break
case"object":t=2,s=3
break
case"undefined":t=3,s=3
break
default:throw new Error("Invalid primitive passed to pushPrimitive")}let n=this.sizeImmediate(t<<3|s,t)
this.push(13,n)}sizeImmediate(e,t){return e>=65535||e<0?this.constants.number(t)<<3|5:e}pushPrimitiveReference(e){this.primitive(e),this.primitiveReference()}pushComponentDefinition(e){this.push(72,this.constants.handle(e))}resolveDynamicComponent(e){this.push(75,this.constants.serializable(e))}staticComponentHelper(e,t,s){let{handle:n,capabilities:i,compilable:r}=this.compiler.resolveLayoutForTag(e,this.referrer)
if(null!==n&&null!==i&&r){if(t)for(let e=0;e<t.length;e+=2)t[e][0]=`@${t[e][0]}`
return this.pushComponentDefinition(n),this.invokeStaticComponent(i,r,null,null,t,!1,s&&s),!0}return!1}invokePartial(e,t,s){let n=this.constants.serializable(e),i=this.constants.stringArray(t),r=this.constants.array(s)
this.push(95,n,i,r)}resolveMaybeLocal(e){this.push(96,this.string(e))}debugger(e,t){this.push(97,this.constants.stringArray(e),this.constants.array(t))}text(e){this.push(26,this.constants.string(e))}openPrimitiveElement(e){this.push(33,this.constants.string(e))}modifier(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(40,this.constants.handle(e)),this.popFrame()}comment(e){let t=this.constants.string(e)
this.push(27,t)}dynamicAttr(e,t,s){let n=this.constants.string(e),i=t?this.constants.string(t):0
this.isComponentAttrs?this.push(37,n,!0===s?1:0,i):this.push(36,n,!0===s?1:0,i)}staticAttr(e,t,s){let n=this.constants.string(e),i=t?this.constants.string(t):0
if(this.isComponentAttrs)this.pushPrimitiveReference(s),this.push(37,n,1,i)
else{let e=this.constants.string(s)
this.push(35,n,e,i)}}hasBlockParams(e){this.getBlock(e),this.resolveBlock(),this.push(10)}getProperty(e){this.push(7,this.string(e))}helper(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(1,this.constants.handle(e)),this.popFrame(),this.fetch(Ct.v0)}bindDynamicScope(e){this.push(43,this.names(e))}replayable({args:e,body:t}){this.startLabels(),this.pushFrame(),this.returnTo("ENDINITIAL")
let s=e()
this.enter(s),t(),this.label("FINALLY"),this.exit(),this.return(),this.label("ENDINITIAL"),this.popFrame(),this.stopLabels()}replayableIf({args:e,ifTrue:t,ifFalse:s}){this.replayable({args:e,body:()=>{this.jumpUnless("ELSE"),t(),this.jump("FINALLY"),this.label("ELSE"),s&&s()}})}inlineBlock(e){return new ei(this.compiler,{block:e,containingLayout:this.containingLayout})}evalSymbols(){let{containingLayout:{block:e}}=this
return e.hasEval?e.symbols:null}compileParams(e){if(!e)return 0
for(let t=0;t<e.length;t++)this.expr(e[t])
return e.length}compileArgs(e,t,s,n){s&&(this.pushYieldableBlock(s.main),this.pushYieldableBlock(s.else),this.pushYieldableBlock(s.attrs))
let i=this.compileParams(e)<<4
n&&(i|=8),s&&(i|=7)
let r=bt
if(t){r=t[0]
let e=t[1]
for(let t=0;t<e.length;t++)this.expr(e[t])}this.pushArgs(r,i)}template(e){return e?this.inlineBlock(e):null}}class ui extends hi{pushBlock(e){e?this.pushOther(e):this.primitive(null)}resolveBlock(){this.push(46)}pushLayout(e){e?this.pushOther(e):this.primitive(null)}resolveLayout(){this.push(46)}invokeStatic(e){this.pushOther(e),this.push(46),this.pushMachine(49)}pushOther(e){this.push(12,this.other(e))}other(e){return this.constants.other(e)}}const ci={},pi=0,di=Object.freeze([])
class mi{constructor(){this.strings=[],this.arrays=[di],this.tables=[],this.handles=[],this.resolved=[],this.numbers=[]}string(e){let t=this.strings.indexOf(e)
return t>-1?t:this.strings.push(e)-1}stringArray(e){let t=new Array(e.length)
for(let s=0;s<e.length;s++)t[s]=this.string(e[s])
return this.array(t)}array(e){if(0===e.length)return pi
let t=this.arrays.indexOf(e)
return t>-1?t:this.arrays.push(e)-1}handle(e){let t=this.handles.indexOf(e)
return t>-1?t:(this.resolved.push(ci),this.handles.push(e)-1)}serializable(e){let t=JSON.stringify(e),s=this.strings.indexOf(t)
return s>-1?s:this.strings.push(t)-1}number(e){let t=this.numbers.indexOf(e)
return t>-1?t:this.numbers.push(e)-1}toPool(){return{strings:this.strings,arrays:this.arrays,handles:this.handles,numbers:this.numbers}}}class gi extends mi{constructor(e,t){super(),this.resolver=e,t&&(this.strings=t.strings,this.arrays=t.arrays,this.handles=t.handles,this.resolved=this.handles.map(()=>ci),this.numbers=t.numbers)}getNumber(e){return this.numbers[e]}getString(e){return this.strings[e]}getStringArray(e){let t=this.getArray(e),s=new Array(t.length)
for(let n=0;n<t.length;n++){let e=t[n]
s[n]=this.getString(e)}return s}getArray(e){return this.arrays[e]}resolveHandle(e){let t=this.resolved[e]
if(t===ci){let s=this.handles[e]
t=this.resolved[e]=this.resolver.resolve(s)}return t}getSerializable(e){return JSON.parse(this.strings[e])}}class fi extends gi{constructor(){super(...arguments),this.others=[],this.serializables=[]}serializable(e){let t=this.serializables.indexOf(e)
return t>-1?t:this.serializables.push(e)-1}getSerializable(e){return this.serializables[e]}getOther(e){return this.others[e-1]}other(e){return this.others.push(e)}}class bi{constructor(e){this.heap=e,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get isMachine(){return 1024&this.heap.getbyaddr(this.offset)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}function yi(e,t,s){return e|t<<16|s<<30}function vi(e,t){return e|t<<30}const ki=1048576
class wi{constructor(e){if(this.placeholders=[],this.offset=0,this.handle=0,this.capacity=ki,e){let{buffer:t,table:s,handle:n}=e
this.heap=new Uint16Array(t),this.table=s,this.offset=this.heap.length,this.handle=n,this.capacity=0}else this.heap=new Uint16Array(ki),this.table=[]}push(e){this.sizeCheck(),this.heap[this.offset++]=e}sizeCheck(){if(0===this.capacity){let e=_i(this.heap,0,this.offset)
this.heap=new Uint16Array(e.length+ki),this.heap.set(e,0),this.capacity=ki}this.capacity--}getbyaddr(e){return this.heap[e]}setbyaddr(e,t){this.heap[e]=t}malloc(){this.table.push(this.offset,0)
let e=this.handle
return this.handle+=2,e}finishMalloc(e,t){let s=this.table[e],n=yi(this.offset-s,t,0)
this.table[e+1]=n}size(){return this.offset}getaddr(e){return this.table[e]}gethandle(e){this.table.push(e,yi(0,0,3))
let t=this.handle
return this.handle+=2,t}sizeof(e){return-1}scopesizeof(e){return(1073676288&this.table[e+1])>>16}free(e){let t=this.table[e+1]
this.table[e+1]=vi(t,1)}compact(){let e=0,{table:t,table:{length:s},heap:n}=this
for(let i=0;i<s;i+=2){let s=t[i],r=t[i+1],a=65535&r,l=-1&r
if(2!==l)if(1===l)t[i+1]=vi(r,2),e+=a
else if(0===l){for(let t=s;t<=i+a;t++)n[t-e]=n[t]
t[i]=s-e}else 3===l&&(t[i]=s-e)}this.offset=this.offset-e}pushPlaceholder(e){this.sizeCheck()
let t=this.offset++
this.heap[t]=65535,this.placeholders.push([t,e])}patchPlaceholders(){let{placeholders:e}=this
for(let t=0;t<e.length;t++){let[s,n]=e[t]
this.setbyaddr(s,n())}}capture(e=this.offset){this.patchPlaceholders()
let t=_i(this.heap,0,e).buffer
return{handle:this.handle,table:this.table,buffer:t}}}class Si{constructor(e=new mi,t=new wi){this.constants=e,this.heap=t,this._opcode=new bi(this.heap)}opcode(e){return this._opcode.offset=e,this._opcode}}class Ci extends Si{}function _i(e,t,s){if(void 0!==e.slice)return e.slice(t,s)
let n=new Uint16Array(s)
for(;t<s;t++)n[t]=e[t]
return n}class Ei extends ni{constructor(e,t,s){let n=new fi(t)
super(s,new Ci(n),e)}builderFor(e){return new ui(this,e)}}let xi=0
class Ai{constructor(e,t){this.compiler=e,this.parsedLayout=t,this.layout=null,this.partial=null,this.wrappedLayout=null
let{block:s}=t
this.symbols=s.symbols,this.hasEval=s.hasEval,this.referrer=t.referrer,this.id=t.id||`client-${xi++}`}asLayout(){return this.layout?this.layout:this.layout=new Zn(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!1}))}asPartial(){return this.partial?this.partial:this.layout=new Zn(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!0}))}asWrappedLayout(){return this.wrappedLayout?this.wrappedLayout:this.wrappedLayout=new ii(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!1}))}}class Ti{constructor(e){this.owner=e,this.handleLookup=[],this.cache={component:new Vn,template:new Vn,compiledTemplate:new Vn,helper:new Vn,manager:new Vn,modifier:new Vn}}lookup(e,t,s){return this.cache[e].hasName(t)?this.cache[e].getHandle(t):null}register(e,t,s){let n=this.cache[e],i=this.handleLookup.length
return this.handleLookup.push(n),this.cache[e].register(i,t,s),i}lookupModifier(e,t){let s=this.lookup("modifier",e)
if(null===s)throw new Error(`Modifier for ${e} not found.`)
return s}compileTemplate(e,t){if(!this.cache.compiledTemplate.hasName(e)){let s=this.resolve(t),n=JSON.parse(s.block),i=new Zn(this.compiler,{block:n,referrer:s.meta,asPartial:!1}),r={handle:i.compile(),symbolTable:i.symbolTable}
return this.register("compiledTemplate",e,r),r}let s=this.lookup("compiledTemplate",e)
return this.resolve(s)}registerHelper(e,t){return this.register("helper",e,(e,s)=>new Hn(t,s))}registerInternalHelper(e,t){this.register("helper",e,t)}registerComponent(e,t,s,n){let i=this.registerTemplate(t,n),r=this.managerFor(i.meta.managerId),a=new G(e,r,s,i.handle)
return this.register("component",e,a)}lookupComponentHandle(e,t){return this.cache.component.hasName(e)||this.lookupComponentDefinition(e,t),this.lookup("component",e,t)}managerFor(e="main"){let t
if(this.cache.manager.hasName(e)){let t=this.cache.manager.getHandle(e)
return this.cache.manager.getByHandle(t)}{let{rootName:s}=this.owner
if(!(t=this.owner.lookup(`component-manager:/${s}/component-managers/${e}`)))throw new Error(`No component manager found for ID ${e}.`)
return this.register("manager",e,t),t}}registerTemplate(e,t){return{name:e,handle:this.register("template",e,t),meta:t.meta}}lookupComponentDefinition(e,t){let s
if(this.cache.component.hasName(e))s=this.lookup("component",e,t)
else{let n=function(e,t){if(null==e)throw new Error(t)
return e}(this.identifyComponent(e,t),`Could not find the component '${e}'`),i=this.owner.lookup("template",n),r=this.owner.identify("component",n),a=null
void 0!==r&&(a=this.owner.factoryFor(r)),s=this.registerComponent(e,n,a,i)}return this.resolve(s)}lookupHelper(e,t){if(!this.cache.helper.hasName(e)){let s=this.owner,n=`helper:${e}`,i=t.specifier,r=s.identify(n,i)
if(void 0===r)return null
let a=this.owner.lookup(r,t.specifier)
return this.registerHelper(e,a)}return this.lookup("helper",e,t)}lookupPartial(e,t){throw new Error("Partials are not available in Glimmer applications.")}resolve(e){return this.handleLookup[e].getByHandle(e)}identifyComponent(e,t){let s=this.owner,n=`template:${e}`,i=t.specifier,r=s.identify(n,i)
if(void 0===r&&s.identify(`component:${e}`,i))throw new Error(`The component '${e}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return r}}var Ni={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
function Oi(e,t){let s=e.getSelf(),n=t.capture(),i=n.positional.at(0).value()
return"function"!=typeof i&&function(e,t){let s=function(e){let t,s,n=""
if(null==e)return n
"parent"in e&&"property"in e?(t=e.parent.value(),s=e.property):"_parentValue"in e&&"_propertyKey"in e&&(t=e._parentValue,s=e._propertyKey)
void 0!==s&&(n+=`('${s}' on ${function(e){let t=typeof e
if(null==e)return t
if("number"===t||"boolean"===t)return e.toString()
if(e.debugName)return e.debugName
try{return JSON.stringify(e)}catch(s){}return e.toString()}(t)}) `)
return n}(t)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${s}was ${typeof e} instead of a function.`)}(i,n.positional.at(0)),new Xe(function(...e){let t=n.positional.value()
t.shift(),t.push(...e),i.apply(s&&s.value(),t)})}function Bi(e){return e[0]?e[1]:e[2]}class Li{constructor(e){this.resolver=e}getComponentDefinition(e){let t=this.resolver.resolve(e)
return ot(!!t,`Couldn't find a template for ${e}`),t}getCapabilities(e){let t=this.getComponentDefinition(e),{manager:s,state:n}=t
return s.getCapabilities(n)}getLayout(e){let t=this.getComponentDefinition(e),{manager:s}=t,n=s.getLayout(t,this.resolver)
return{compile:()=>n.handle,symbolTable:n.symbolTable}}lookupHelper(e,t){return this.resolver.lookupHelper(e,t)}lookupModifier(e,t){return this.resolver.lookupModifier(e,t)}lookupComponentDefinition(e,t){return this.resolver.lookupComponentHandle(e,t)}lookupPartial(e,t){return this.resolver.lookupPartial(e,t)}}class Di{constructor(e){this.resolver=e}async getTemplateIterator(e,t,s,n,i){let r=new Ti(e),a=new Li(r),l=new Kn,o=new Ei(a,r,l),h=o.program
r.compiler=o,r.registerTemplate("main",Ni),r.registerInternalHelper("action",Oi),r.registerHelper("if",Bi)
let u=function({id:e,meta:t,block:s}){let n,i=e||`client-${xi++}`
return{id:i,meta:t,create:(e,r)=>{let a=r?ut({},r,t):t
return n||(n=JSON.parse(s)),new Ai(e,{id:i,block:n,referrer:a})}}}(Ni).create(o)
return Promise.resolve(function(e,t,s,n,i,r){let a=Nn.initial(e,t,s,n,i,r)
return new On(a)}(h,t,i,n,s,u.asLayout().compile()))}}class Mi{constructor({element:e,nextSibling:t=null}){this.cursor={element:e,nextSibling:t}}getBuilder(e){return function(e,t){return tn.forInitialRender(e,t)}(e,this.cursor)}}class Ii{render(e){let t
do{t=e.next()}while(!t.done)
this.result=t.value}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}function Ri(e){return void 0!==e.rootName&&void 0!==e.collection&&void 0!==e.name&&void 0!==e.type}function Fi(e){let t=e.type,s=function(e){let t=[]
e.rootName&&t.push(e.rootName)
e.collection&&t.push(e.collection)
e.namespace&&t.push(e.namespace)
e.name&&t.push(e.name)
if(t.length>0){let s=t.join("/")
return Ri(e)&&(s="/"+s),s}}(e)
return s?t+":"+s:t}function Vi(e){let t={}
if(e.indexOf(":")>-1){let s,n=e.split(":"),i=n[0],r=n[1]
t.type=i,0===r.indexOf("/")?(s=r.substr(1).split("/"),r.substr(1).startsWith("@")?t.rootName=s.shift()+"/"+s.shift():t.rootName=s.shift(),t.collection=s.shift()):s=r.split("/"),s.length>0&&(t.name=s.pop(),s.length>0&&(t.namespace=s.join("/")))}else t.type=e
return t}function Hi(e,t){if(!t)throw new Error("Assertion Failed: "+e)}class ji{constructor(e,t){this.config=e,this.registry=t}identify(e,t){if(function(e){let t=e.split(":"),s=t[0],n=t[1]
return!!(s&&n&&0===n.indexOf("/")&&n.split("/").length>3)}(e))return e
let s,n=Vi(e)
if(t){let e=Vi(t)
if(Ri(e)){Hi("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===n.rootName&&void 0===n.collection&&void 0===n.namespace),n.rootName=e.rootName,n.collection=e.collection
let t=this._definitiveCollection(n.type)
if(!n.name)return n.namespace=e.namespace,n.name=e.name,this._serializeAndVerify(n)
if(n.namespace=e.namespace?e.namespace+"/"+e.name:e.name,function(e){let{namespace:t,collection:s}=e,n=t.lastIndexOf("/-")
if(n>-1){n+=2
let e=t.indexOf("/",n)
s=t.slice(n,e>-1?e:void 0)}return s}(n)===t&&(s=this._serializeAndVerify(n)))return s
if(t&&(n.namespace+="/-"+t,s=this._serializeAndVerify(n)))return s
n.rootName=n.collection=n.namespace=void 0}else Hi('Referrer must either be "absolute" or include a `type` to determine the associated type',e.type),n.collection=this._definitiveCollection(e.type),n.namespace||(n.namespace=e.rootName),Hi(`'${e.type}' does not have a definitive collection`,n.collection)}if(n.collection||(n.collection=this._definitiveCollection(n.type),Hi(`'${n.type}' does not have a definitive collection`,n.collection)),!n.rootName){if(n.rootName=this.config.app.rootName||"app",s=this._serializeAndVerify(n))return s
n.namespace?(n.rootName=n.namespace,n.namespace=void 0):(n.rootName=n.name,n.name="main")}return(s=this._serializeAndVerify(n))?s:void 0}retrieve(e){return this.registry.get(e)}resolve(e,t){let s=this.identify(e,t)
if(s)return this.retrieve(s)}_definitiveCollection(e){let t=this.config.types[e]
return Hi(`'${e}' is not a recognized type`,t),t.definitiveCollection}_serializeAndVerify(e){let t=Fi(e)
if(this.registry.has(t))return t}}class Pi{constructor(e={}){this._entries=e}has(e){return e in this._entries}get(e){return this._entries[e]}}const zi="all",Ui="active"
function $i(e,t){U(e,t).inner.dirty()}function Wi(e){return["completed","title","id"].map(t=>{$i(e,t)}),e}const Gi="undefined"!=typeof API?API:{addTodo(e){},removeTodo(e){},clearCompleted(){},store:{counter:0,todos:[]},todos:()=>[],remaining:()=>[],completed:()=>[]},Yi=13,qi=27
window.location.port
var Ki={"component:/glimmer/components/Glimmer":class extends ${constructor(){super(...arguments),this.counter=0,this.editedTodo=null,this.todos=API.store.todos||[],this.newField="",this.filterIteration=1}get filteredTodos(){const e=this.todos,t=this.nowShowing
return t===zi?e:t===Ui?Gi.remaining():Gi.completed()}get remaining(){const e=this.todos,t=Gi.remaining()
return t?t.length:e.filter(e=>!e.completed).length}didUpdate(){setTimeout(()=>{let e=this.element.querySelector(".edit")
e&&e.focus()},0)}get nowShowing(){return this.filterIteration&&window.location.hash.replace("#/","")||zi}didInsertElement(){window.appComponent=this}setState(e){this.counter=e.counter,this.todos=e.todos.map(Wi),$i(this,"todos"),$i(this,"counter"),$i(this,"nowShowing"),$i(this,"remaining"),$i(this,"filteredTodos"),function(e){const t=e.__owner__
t._rendering=!0,t._rerender(),t._rendering=!1,t._scheduled=!1}(this)}onEdit(e){this.editedTodo=e}onRemove(e){this.todos=this.todos.filter(t=>t!==e),Gi.removeTodo(e)}updateTodo(e,t){this.todos=this.todos.map(s=>s===e?t:s)}maybeFinishEdit(e,t){if(t.keyCode===Yi||"blur"===t.type){const s=Object.assign({},e,{title:t.target.value})
this.updateTodo(e,s),this.editedTodo=null}else t.keyCode===qi&&(this.editedTodo=null)}onCheck(e,t){const s=Object.assign({},e,{completed:t.target.checked})
this.updateTodo(e,s)}handleNewTodoKeyDown(e){if(e.keyCode!==Yi)return
e.preventDefault()
const t=e.target.value.trim()
t&&(this.newField="",this.todos=this.todos.concat({completed:!1,id:Date.now(),title:t}),Gi.addTodo(t))}onClearCompleted(){this.todos=this.todos.filter(e=>!e.completed)}onChangeFilter(){this.filterIteration=this.filterIteration+1}},"template:/glimmer/components/Glimmer":{id:"Sa/olHlf",block:'{"symbols":["todo"],"statements":[[6,"section"],[10,"class","todoapp"],[8],[0,"\\n    "],[6,"header"],[10,"class","header"],[8],[0,"\\n    "],[6,"h1"],[8],[1,[21,0,["counter"]],false],[9],[0,"\\n    "],[6,"input"],[10,"class","new-todo"],[10,"autofocus",""],[10,"autocomplete","off"],[10,"placeholder","What to do?"],[11,"value",[21,0,["newField"]],null],[11,"onkeydown",[26,"action",[[21,0,["handleNewTodoKeyDown"]]],null],null],[8],[9],[0,"\\n    "],[9],[0,"\\n"],[4,"if",[[21,0,["filteredTodos","length"]]],null,{"statements":[[0,"    "],[6,"section"],[10,"class","main"],[8],[0,"\\n        "],[6,"ul"],[10,"class","todo-list"],[8],[0,"\\n"],[4,"each",[[21,0,["filteredTodos"]]],[["key"],["@index"]],{"statements":[[0,"                "],[5,"TodoItem",[],[["@todo","@isEdited","@onRemove","@onEditChange","@onEdit","@onCheck"],[[21,1,[]],[26,"eq",[[21,0,["editedTodo"]],[21,1,[]]],null],[26,"action",[[21,0,["onRemove"]],[21,1,[]]],null],[26,"action",[[21,0,["maybeFinishEdit"]],[21,1,[]]],null],[26,"action",[[21,0,["onEdit"]],[21,1,[]]],null],[26,"action",[[21,0,["onCheck"]],[21,1,[]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[1]},null],[0,"        "],[9],[0,"\\n    "],[9],[0,"\\n"]],"parameters":[]},null],[0,"    "],[5,"TodoFooter",[],[["@activeTab","@remaining","@hasCompleted","@onClearCompleted","@onChangeFilter"],[[21,0,["nowShowing"]],[21,0,["remaining"]],[26,"gt",[[21,0,["todos","length"]],[21,0,["remaining"]]],null],[26,"action",[[21,0,["onClearCompleted"]]],null],[26,"action",[[21,0,["onChangeFilter"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"],[9]],"hasEval":false}',meta:{specifier:"template:/glimmer/components/Glimmer"}},"template:/glimmer/components/TodoFooter":{id:"SMQ/te82",block:'{"symbols":["@onClearCompleted","@remaining","@onChangeFilter","@activeTab","@hasCompleted"],"statements":[[6,"footer"],[10,"class","footer"],[8],[0,"\\n    "],[6,"span"],[10,"class","todo-count"],[8],[0,"\\n        "],[6,"strong"],[8],[1,[21,2,[]],false],[9],[0," "],[1,[26,"pluralize",[[21,2,[]]],null],false],[0," left\\n    "],[9],[0,"\\n    "],[6,"ul"],[10,"class","filters"],[11,"onclick",[21,3,[]],null],[8],[0,"\\n        "],[6,"li"],[8],[6,"a"],[10,"href","#/all"],[11,"class",[27,[[26,"if",[[26,"eq",[[21,4,[]],"all"],null],"selected"],null]]]],[8],[0,"All"],[9],[9],[0,"\\n        "],[6,"li"],[8],[6,"a"],[10,"href","#/active"],[11,"class",[27,[[26,"if",[[26,"eq",[[21,4,[]],"active"],null],"selected"],null]]]],[8],[0,"Active"],[9],[9],[0,"\\n        "],[6,"li"],[8],[6,"a"],[10,"href","#/completed"],[11,"class",[27,[[26,"if",[[26,"eq",[[21,4,[]],"completed"],null],"selected"],null]]]],[8],[0,"Completed"],[9],[9],[0,"\\n    "],[9],[0,"\\n"],[4,"if",[[21,5,[]]],null,{"statements":[[0,"    "],[6,"button"],[10,"class","clear-completed"],[11,"onclick",[26,"action",[[21,1,[]]],null],null],[8],[0,"\\n        Clear completed\\n    "],[9],[0,"\\n"]],"parameters":[]},null],[9]],"hasEval":false}',meta:{specifier:"template:/glimmer/components/TodoFooter"}},"template:/glimmer/components/TodoItem":{id:"s6EswmWW",block:'{"symbols":["@todo","@onEditChange","@isEdited","@onCheck","@onEdit","@onRemove"],"statements":[[6,"li"],[10,"class","todo"],[11,"class",[27,[[26,"if",[[21,1,["completed"]]," completed"],null],[26,"if",[[21,3,[]]," editing"],null]]]],[8],[0,"\\n    "],[6,"div"],[10,"class","view"],[8],[0,"\\n        "],[6,"input"],[10,"class","toggle"],[10,"type","checkbox"],[11,"checked",[21,1,["completed"]],null],[11,"onchange",[26,"action",[[21,4,[]]],null],null],[8],[9],[0,"\\n        "],[6,"label"],[11,"ondblclick",[26,"action",[[21,5,[]]],null],null],[8],[1,[21,1,["title"]],false],[9],[0,"\\n        "],[6,"button"],[10,"class","destroy"],[11,"onclick",[26,"action",[[21,6,[]]],null],null],[8],[9],[0,"\\n    "],[9],[0,"\\n"],[4,"if",[[21,3,[]]],null,{"statements":[[0,"    "],[6,"input"],[10,"class","edit"],[10,"type","text"],[11,"value",[21,1,["title"]],null],[10,"autofocus",""],[11,"onblur",[26,"action",[[21,2,[]]],null],null],[11,"onkeyup",[26,"action",[[21,2,[]]],null],null],[8],[9],[0,"\\n"]],"parameters":[]},null],[9]],"hasEval":false}',meta:{specifier:"template:/glimmer/components/TodoItem"}},"helper:/glimmer/components/eq":function([e,t]){return e===t},"helper:/glimmer/components/gt":function([e,t]){return e>t},"helper:/glimmer/components/pluralize":function([e]){return 1===e?"item":"items"}},Ji={app:{name:"glimmer",rootName:"glimmer"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
const Xi=new class extends Fn{constructor(){let e=new Pi(Ki),t=new ji(Ji,e)
const s=document.body
super({builder:new Mi({element:s,nextSibling:null}),loader:new Di(t),renderer:new Ii,resolver:t,rootName:Ji.app.rootName})}},Qi=document.getElementById("app")
Xi.registerInitializer({initialize(e){e.register(`component-manager:/${Xi.rootName}/component-managers/main`,et)}}),Xi.renderComponent("Glimmer",Qi,null),Xi.boot(),setTimeout(()=>{"undefined"!=typeof API&&(API.render=function(){window.appComponent&&window.appComponent.setState(API.store)},API.READY=!0,API.reset(6))},10)})
