MOBx

actions => can be invoked by some event .. they can update values/state and may have other side effects
state => is observable. should not contain redundent data
computed values => will be derived from state using pure function
reactions => similar to computed values.. but they produce side effect (ie UI updation) instead of values

However, if you would remove the Tasks left line (computed function reference) (or put it into a separate component), the TodoListView will no longer re-render when ticking a box. You can verify this yourself by changing the JSFiddle.

"MobX reacts to any existing observable property that is read during the execution of a tracked function."
"reading"=> is dereferencing an object's property, which can be done through "dotting into" it
"trackable functions"=> expression of computed, render(), functions that are passed as the first param to when, reaction and autorun
"during"=> means that only those observables that are being read while the function is executing are tracked. It doesn't matter whether these values are used directly or indirectly by the tracked function.

Note: always define the setter after the getter, some TypeScript versions are known to declare two properties with the same name otherwise.

@action.bound ?
keepAlive

