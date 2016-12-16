# Ember Refined Faker [![travis-ci][travis-ci]][travis-link] [![fastboot][fastboot]][self]

[self]: https://github.com/very-geek/ember-refined-faker	"Ember Refined Faker"
[travis-link]: https://travis-ci.org/very-geek/ember-refined-faker
[travis-ci]: https://img.shields.io/travis/very-geek/ember-refined-faker/master.svg?style=flat-square
[fastboot]: https://img.shields.io/badge/%20fastboot--compatible%20-yes-brightgreen.svg?style=flat-square

## 安装

在 Ember 应用程序或 addon 项目的根路径下执行：

```shell
$ ember install ember-refined-faker
```

## 用法

### 简单调用

```handlebars
{{fake "namespace.method" args}}
```

**namespace.method**

代理 faker.js 的简单调用，适用于大多数情况。例如：

```handlebars
{{fake "name.findName"}}
```

相当于：

```javascript
faker.name.findName()
```

**args**

表示若干可选参数，适用于允许接收参数的 faker.js 调用。例如：

```handlebars
{{fake "finance.amount" 0 100 2 "$"}}
```

相当于：

```javascript
faker.finance.amount(0, 100, 2, '$')
```

💡 如果传入的参数需要是 `Object` 类型，可以使用 Ember 内置的 `hash` helper 来创建。例如：

```handlebars
{{fake "random.objectElement" (hash foo=1 bar=2 baz=3)}}
```

相当于：

```javascript
faker.random.objectElement({foo: 1, bar: 2, baz: 3})
```

💡 如果传入的参数需要是 `Array` 类型，可以使用 ember-refined-faker 提供的 `arr` helper 来创建。例如：

```handlebars
{{fake "random.arrayElement" (arr 1 2 3)}}
```

相当于：

```javascript
faker.random.arrayElement([1 2 3])
```

> 如果安装了 [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers)，推荐使用该 addon 提供的 `array` helper。

> faker.js 可用的方法参见：[faker.js demo](https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html)，另外可以通过 [faker.js API 文档](http://marak.github.io/faker.js/faker.html)查看所有的方法签名。

### 复合表达式调用

faker.js 支持更高级的复合表达式（利用 mustache 模板语法进行变量内插），ember-refined-faker 也支持这种特性，只需要传入 `parse=true` 参数即可。例如：

```handlebars
{{fake "Hi, I'm [random.number] years old." parse=true}}
```

会生成 `"Hi, I'm xxx years old."`，`xxx` 即是一个随机数字。

### 多语言支持

faker.js 内置简单的多语言支持，默认情况下设置的语言是 `en_US`，可以通过传入 `locale="xxx"` 来临时改变输出的语言。例如：

```handlebars
{{fake "name.findName"}}
{{fake "name.findName" locale="zh_CN"}}
{{fake "name.findName"}}
```

以上三条语句会输出：

```
John Doe
王 小二
Mary Lau
```

也就是说临时改变的语言不会一直生效，一旦不传 `locale` 参数就会恢复到默认设置的语言。

用户可以指定应用程序启动时默认的语言，只需要在 `ember-cli-build.js` 中添加配置项：

```javascript
module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    faker: {
      defaultLocale: 'zh_CN'
    }
  });

  return app.toTree();
}
```

### 更好的占位图片服务

faker.js 内置了 [lorempixel.com](http://lorempixel.com/) 的占位图片服务，但是访问的速度比较慢（🇨🇳），因此 ember-refined-faker 增加了一个新的占位图片服务 [unspalsh.it](https://unsplash.it)，以下是用法介绍：

**输出 https://unsplash.it/400/300 （默认尺寸）**

```handlebars
{{fake "image.unsplash"}}
```

**输出 https://unsplash.it/800/450 （width * height)**

```handlebars
{{fake "image.unsplash" 800 450}}
```

**输出 https://unsplash.it/400/300?blur （虚化效果）**

```handlebars
{{fake "image.unsplash" blur=true}}
```

**输出 https://unsplash.it/400/300?random （随机）**

```handlebars
{{fake "image.unsplash" random=true}}
```

**输出 https://unsplash.it/400/300?gravity=center （裁剪？）**

```handlebars
{{fake "image.unsplash" gravity=center}}
```

gravity 参数按照图片服务的说明是对图片裁剪的方位选择，共有 `north, east, south, west, center` 五个值可用。遗憾的是我没看出来是怎么裁剪的……

**输出 https://unsplash.it/g/400/300 （灰阶）**

```handlebars
{{fake "image.unsplash" grayscale=true}}
```

### 禁用

技术上来说，ember-refined-faker 应该仅用于 development 阶段，特别是在早中期尚未确定具体内容之前当作临时占位内容生成器来用。因此，最好的禁用方法莫过于从你的应用程序里彻底删除 ember-refined-faker：

```shell
# 如果你用 npm：
$ npm uninstall ember-refined-faker --save-dev

# 如果你用 yarn：
$ yarn remove ember-refined-faker --dev
```

请确保在你的模板中没有残留的 `{{fake}}` 或 `{{arr}}` helper，否则你会看到如下的异常：

```
Uncaught Error: Compile Error: fake is not a helper
```

可是有的时候你只是想暂时禁用一下并且以后还会继续使用的话，有两种方式可以帮助你：

1. 默认情况下，ember-refined-faker 只在 development 和 test 环境下启用，一旦你运行或是构建于 production 环境下，ember-refined-faker 会自动将自己从构建结果中剔除掉；

2. 你可以在 `ember-cli-build.js` 文件中手动禁用 ember-refined-faker，这样任何环境都会保持一致：

   ```javascript
   module.exports = function(defaults) {
     var app = new EmberApp(defaults, {
       faker: {
         enabled: false
       }
     });

     return app.toTree();
   }
   ```

## TODO

1. `{{fake "image.list" amount}}`: 允许返回指定长度的图片数组
