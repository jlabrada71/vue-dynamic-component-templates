# Dynamic Component Templates with Vue.js
Components do not always have the same structure. Sometimes there are many different states to manage. It can be helpful to do this asynchronously.
## 🤔 The Use Case
Component templates are used in Scrumpy in several places such as notifications, comments, and attachments. Let’s take a look at comments and see what I actually mean by that.

Comments are no longer just simple text fields today. You expect to be able to post links, upload images, integrate videos and much more. All these completely different elements must be rendered in this comment. If you try to do this within one component, it can quickly become an absolute mess.


The most common previews for links — open graph data, images & videos
How can we deal with this problem? Probably most people would check all cases and then load specific components after that. Something like this:
```
<template>
    <div class="comment">
        // comment text    
        <p>...</p>
    
        // open graph image
        <link-open-graph v-if="link.type === 'open-graph'" />
        // regular image
        <link-image v-else-if="link.type === 'image'" />
        // video embed
        <link-video v-else-if="link.type === 'video'" />
        ...
    </div>
</template>

```
However, this can become very cluttered and repetitive if the list of supported templates becomes longer and longer. In our case of comments— just think of supporting embeds for Youtube, Twitter, Github, Soundcloud, Vimeo, Figma… the list is endless.

## 🤯 Dynamic Component Templates
Another way is to have some kind of loader that loads exactly the template you need. This allows you to write a clean component like this:

```
<template>
    <div class="comment">
        // comment text    
        <p>...</p>
    
        // type can be 'open-graph', 'image', 'video'...
        <dynamic-link :data="someData" :type="type" />
    </div>
</template>
```

Looks much better, doesn’t it? Let’s see how this component works. First, we have to change the folder structure for our templates.


## folder structure for dynamic component templates
Personally, I like to create a folder for each component, because more files for styling and testing can be added later. How you want to build the structure is up to you, of course.

Next, we look at how this <dynamic-link /> component is built.

```
<template>
    <component :is="component" :data="data" v-if="component" />
</template>
<script>
export default {
    name: 'dynamic-link',
    props: ['data', 'type'],
    data() {
        return {
            component: null,
        }
    },
    computed: {
        loader() {
            if (!this.type) {
                return null
            }
            return () => import(`templates/${this.type}`)
        },
    },
    mounted() {
        this.loader()
            .then(() => {
                this.component = () => this.loader()
            })
            .catch(() => {
                this.component = () => import('templates/default')
            })
    },
}
</script>

```

So what’s going on here? Dynamic components are supported by Vue.js by default. The problem is that you have to register/import all the components you want to use. 👎

```
<template>
    <component :is="someComponent"></component>
</template>
<script>
import someComponent from './someComponent'
export default {
    components: {
        someComponent,
    },
}
</script>
```

Nothing is gained here because we want to use our components dynamically. So what we can do is to use dynamic imports from Webpack. Used together with computed values this is where the magic happens–yes, computed values can return a function. Super handy! 🙌

```
computed: {
    loader() {
        if (!this.type) {
           return null
        }
        return () => import(`templates/${this.type}`)
    },
},
```

When our component is mounted, we try to load our template. If something went wrong we can set a fallback template. Maybe this can be helpful to show an error message to your users.

```
mounted() {
    this.loader()
        .then(() => {
           this.component = () => this.loader()
        })
        .catch(() => {
           this.component = () => import('templates/default')
        })
},

```

## 💡 Conclusion
Can be useful if you have many different views for one component.
- Easy extendable.
- It’ asynchronous. Templates are only loaded when needed.
- Keeps your code DRY.
