
// ----- TO DO LIST ------
// 0. Responsive design = MediaQuery & IOS vs Android
// 1. GestureDetector and InkWell
// 2. NavigatorBars / Tabs besides BottomNavigationBar()
// 3. Timeline implementations
// 4. Providers(isssue1: ChangeNotifierProvider.value use case?) - learn about other Providers - StreamProvider, FutureProvider
// 5. Animation in Flutter(there is some in ShopApp)
// 6. AppBar actions widgets such as PopupMenuButton
// 7. CustomScrollView and Slivers
// 8. Reponsive/Adaptive Design - Builder() and LayoutBuilder() 

// ----- APIs used -----
// 0. shopApp4 realtime database, REST API
// 1. placesApp5 sqlite, Google Maps, location, Image picker, dart:io
// 2. chatApp6 cloud_firestore,firebase_auth,firebase_storage & firebase_messaging
// 3. field-works(squoosh.app to reduce image file size)
// ###### FROM TRANSACTION TRACKER APP
// 1. List.generate and DateFormat.E()
    List<Map<String, Object>> get groupedTransactionValues {
        return List.generate(7, (index) {
          // Recent Transactions is any transactions that occurred in the past 7 days
          // We are trying to generate a list of 7 maps, with each map containing the day(single letter "M" for monday) and amount spent in that day
          final weekDay = DateTime.now().subtract(
            // First item in list before calling .reversed is therefore today, as index = 0
            Duration(days: index),
          );
          var totalSum = 0.0;
          // default value of totalSum is 0, unless there is a transaction that occurred in that day, as checked below

          for (var i = 0; i < recentTransactions.length; i++) {
            if (recentTransactions[i].date.day == weekDay.day &&
                recentTransactions[i].date.month == weekDay.month &&
                recentTransactions[i].date.year == weekDay.year) {
              totalSum += recentTransactions[i].amount;
            }
          }
          return {
            'day': DateFormat.E().format(weekDay).substring(0, 1),
            // DateFormat() usually accepts a string of the format required, such as DateFormat("yyyy-MM-dd").format(DateTime object)
            // However, there are short skeleton representations. For example DateFormat("yyyy-MM-dd") is represented by DateFormat.yMMMMMd().format(DateTime object)
            // DateFormat.E()  is for ABBR_WEEKDAY
            // substring takes in a string and returns a substring of it
            'amount': totalSum,
          };
        }).reversed.toList();
      }

// 2. Stack() and FractionallySizedBox()
    Stack(
      children: <Widget>[
        Container(
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey, width: 1.0),
            color: Color.fromRGBO(220, 220, 220, 1),
            borderRadius: BorderRadius.circular(10),
        ),
      ),
      FractionallySizedBox(
        heightFactor: spendingPctOfTotal,
        // spendingPctOfTotal  = amount spend in a day/ total amount spent in the week
        child: Container(
          decoration: BoxDecoration(
            color: Theme.of(context).primaryColor,
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
      ],
    ),

// 3. showBottomModalSheet
    void _startAddNewTransaction(BuildContext ctx) {
        showModalBottomSheet(
          // requires context and a builder
          context: ctx,
          builder: (_) {
            return GestureDetector(
              onTap: () {},
              child: NewTransaction(_addNewTransaction),
              // NewTransaction is a Form that contains TextFormFields()
              // _addNewTransaction is a method that submits the form/updates the recentTransactions data to render chart with updated value
              behavior: HitTestBehavior.opaque,
            );
          },
        );
      }

// 4. showDatePicker()
    void _presentDatePicker() {
      // creates a date picker when you require users to select a date
        showDatePicker(
          context: context,
          initialDate: DateTime.now(),
          firstDate: DateTime(2019),
          lastDate: DateTime.now(),
        ).then((pickedDate) {
          if (pickedDate == null) {
            return;
          }
          setState(() {
            _selectedDate = pickedDate;
          });
        });
        print('...');
      }

// ##### MEALS APP

// 1. list.where()
void _setFilters(Map<String, bool> filterData) {
  // _setFilters is a method in your filters screen, where you pass in updated filters, when a user hits save
    setState(() {
      _filters = filterData;
      // DUMMY_MEALS is a List<Meal>
      // _availableMeals contains the Meals which should render with the applied filters
      _availableMeals = DUMMY_MEALS.where((meal) {
        // .where iterates through the entire list, on each iteraction, it applies a test on the value and returns it if the test returns true.
        // in the test below, the test is true only if none of the filters applies to it.
        if (_filters['gluten-free'] && !meal.isGlutenFree) {
          return false;
        }
        if (_filters['lactose-free'] && !meal.isLactoseFree) {
          return false;
        }
        if (_filters['vegan'] && !meal.isVegan) {
          return false;
        }
        if (_filters['vegetarian'] && !meal.isVegetarian) {
          return false;
        }
        return true;
      }).toList();
    });
  }

// 2. SwitchListTile()
Widget _buildSwitchListTile(
    String title,
    String description,
    bool currentValue,
    Function updateValue,
  ) {
    return SwitchListTile(
      // accepts at leat 4 arguments
      title: Text(title),
      value: currentValue,
      // currentValue decides if the Switch is On or Off
      // if currentValue is true, switch is On, otherwise it is off
      subtitle: Text(
        description,
      ),
      onChanged: updateValue,
      // onChanged accepts a function that will update a value, which is currentValue, to update whether the Switch appears On or Off.
      // Below, onChanged changes the value of _glutenFree, which is passed in as third argument which is currentValue
      //  _buildSwitchListTile(
      //             'Gluten-free',
      //             'Only include gluten-free meals.',
      //             _glutenFree,
      //             (newValue) {
      //               setState(
      //                 () {
      //                   _glutenFree = newValue;
      //                 },
      //               );
      //             },
      //           ),
    );
  }

// 3. List.indexWhere()
void _toggleFavorite(String mealId) {
  // _toggleFavourite checks if a meal exists in our list containing favourites == _favouriteMeals
  // if meal exists, remove it
  // otherwise add it
    final existingIndex =
        _favoriteMeals.indexWhere((meal) => meal.id == mealId);
        // .indexWhere iterates through the list to return the first index of the value which satisfies the test
        // if meal does not exist, then it returns -1
    if (existingIndex >= 0) {
      setState(() {
        _favoriteMeals.removeAt(existingIndex);
      });
    } else {
      setState(() {
        _favoriteMeals.add(
          DUMMY_MEALS.firstWhere((meal) => meal.id == mealId),
        );
      });
    }
  }

// 4. List.any()
bool _isMealFavorite(String id) {
  // returns true if any of the items in the list satisfies the test
    return _favoriteMeals.any((meal) => meal.id == id);
  }

// 5.GridView() and gridDelegate property
GridView(
      padding: const EdgeInsets.all(25),
      children: DUMMY_CATEGORIES
          .map(
            (catData) => CategoryItem(
                  catData.id,
                  catData.title,
                  catData.color,
                ),
          )
          .toList(),
      gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 200,
        childAspectRatio: 3 / 2,
        crossAxisSpacing: 20,
        mainAxisSpacing: 20,
      ),
    );

GridView.builder(
      padding: const EdgeInsets.all(10.0),
      itemCount: products.length,
      itemBuilder: (ctx, i) => ChangeNotifierProvider.value(
            // builder: (c) => products[i],
            value: products[i],
            child: ProductItem(
                // products[i].id,
                // products[i].title,
                // products[i].imageUrl,
                ),
          ),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 3 / 2,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
      ),
    );
// 6. Implementing BottomNavigationBar()
class TabsScreen extends StatefulWidget {
  final List<Meal> favoriteMeals;

  TabsScreen(this.favoriteMeals);

  @override
  _TabsScreenState createState() => _TabsScreenState();
}

class _TabsScreenState extends State<TabsScreen> {
  // Initialize properties to assign values to in initState()
  List<Map<String, Object>> _pages;
  int _selectedPageIndex = 0;

  @override
  void initState() {
    _pages = [
      // _pages is a List<Map<String,dynamic> where we store screens we want to render and their relevant data, such as title
      {
        'page': CategoriesScreen(),
        'title': 'Categories',
      },
      {
        'page': FavoritesScreen(widget.favoriteMeals),
        'title': 'Your Favorite',
      },
    ];
    super.initState();
  }

  void _selectPage(int index) {
    // must call setState to render different pages according to the selected tab on the BottomNavBar
    setState(() {
      _selectedPageIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_pages[_selectedPageIndex]['title']),
      ),
      drawer: MainDrawer(),
      body: _pages[_selectedPageIndex]['page'],
      bottomNavigationBar: BottomNavigationBar(
        onTap: _selectPage,
        backgroundColor: Theme.of(context).primaryColor,
        unselectedItemColor: Colors.white,
        selectedItemColor: Theme.of(context).accentColor,
        currentIndex: _selectedPageIndex,
        // type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            backgroundColor: Theme.of(context).primaryColor,
            icon: Icon(Icons.category),
            title: Text('Categories'),
          ),
          BottomNavigationBarItem(
            backgroundColor: Theme.of(context).primaryColor,
            icon: Icon(Icons.star),
            title: Text('Favorites'),
          ),
        ],
      ),
    );
  }
}

// 7. InkWell(), BoxDecoration(gradient: ) property and InkWell vs GestureDetector
InkWell(
      onTap: () => selectCategory(context),
      splashColor: Theme.of(context).primaryColor,
      // splash effect is unique to InkWell, GestureDetector does not have it
      // Difference betweek InkWell and GestureDetector:
      //  They both provide many common features like onTap, onLongPress etc. 
      //  The main difference is GestureDetector provides more controls like dragging etc. on the other hand it doesn't include ripple effect tap, which InkWell does.
      //  You can use either of them according to your needs, you want ripple effects go with InkWell.
      //  If you need more controls go with GestureDetector or even combine both of them
      borderRadius: BorderRadius.circular(15),
      child: Container(
        padding: const EdgeInsets.all(15),
        child: Text(
          title,
          style: Theme.of(context).textTheme.title,
        ),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Colors.purple.withOpacity(0.7)
              Colors.purple,
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(15),
        ),
      ),
    );

// 8. Stack(), Positioned() and Text(softWrap: true,)
Stack(
              children: <Widget>[
                ClipRRect(
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(15),
                    topRight: Radius.circular(15),
                  ),
                  child: Image.network(
                    imageUrl,
                    height: 250,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned(
                  // controls how children of a stack are positioned
                  // can only define top, bottom, left, right.
                  bottom: 20,
                  right: 10,
                  child: Container(
                    width: 300,
                    color: Colors.black54,
                    padding: EdgeInsets.symmetric(
                      vertical: 5,
                      horizontal: 20,
                    ),
                    child: Text(
                      title,
                      style: TextStyle(
                        fontSize: 26,
                        color: Colors.white,
                      ),
                      softWrap: true,
                      overflow: TextOverflow.fade,
                    ),
                  ),
                )
              ],
            ),

// ##### SHOP APP

// 1. MultiProvider and ChangeNotifierProvider()
MultiProvider(
  providers: [
    Provider<Something>(create: (_) => Something()),
    // Replace with ChangeNotifierProvider<Auth>(create: (context) => Auth())
    Provider<SomethingElse>(create: (_) => SomethingElse()),
    Provider<AnotherThing>(create: (_) => AnotherThing()),
  ],
  child: MaterialApp(),
)

// 2. ChangeNotifierProvider.value()
// We have learnt ChangeNotifierProvider(), where we must define create arugment which will create an instance that flutter refers to when it renders something with relevant data
// ChangeNotifierProvider.value() is used when we already have an existing/created instance, in which case we do not want to create a new instance of it.async
ChangeNotifierProvider.value(
  value: Products(),
)


// 3. ChangeNotifierProxyProvider()
ChangeNotifierProxyProvider<Auth, Products>(
  // When you have a provider that depends on another provider/ needs to update when another provider updates in value, we use ChangeNotifierProxyProvider
  // If we were to use a normal ChangeNotifierProvider, when Auth updates and calls notifyListeners(), Products has no way of knowing that/updating
  // In this case, Products provider depends on whether the user is authenticated or not. Only when user is authenticated will there be a valid token and userId.
  // Auth has a _authenticate method where it attempts to log a user in. When the user successfully logs in, firebase returns a token and userId. _authenticate will call notifyListeners()
  // Calling notifyListers() will result in the update function below being called
          update: (ctx, auth, previousProducts) => Products(
            auth.token,
            auth.userId,
            previousProducts == null ? [] : previousProducts.items,
          ),
          // Only with a valid token and userId, will the fetchAndSetProducts() method(and other methods) in Products provider work, to render products stored on Firebase.
          create: (context) => Products(
            // create simply creates an instance of the provider that is used when down the widget tree it is referred to by Provider.of<Products>(context, listen: false/true) or Consumer<Products()
            null,
            null,
            [],
          ),
        ),

// 4. Routes in Flutter
// --Creating our own route
// ----We create our own route on the fly using MaterialPageRoute() wherever a Route is expected
Navigator.of(context).push(
  MaterialPageRoute(
    builder: (context) => ProductsOverviewScreen(),
    settings: RouteSettings(
      arguments: {}, 
    ),
  ),
)

// --Using Named Routes
// ----For each Navigation method, there is an equivalent that uses named routes. For example, .push() is the same as .pushNamed()
// For named routes, we need to register them in the MaterialApp() widget of the main.dart
MaterialApp(
          title: 'MyShop',
          theme: ThemeData(
            primarySwatch: Colors.purple,
            accentColor: Colors.deepOrange,
            fontFamily: 'Lato',
          ),
          home: auth.isAuth
          // instead of home, we can set an initialRoute property(only use one or the other)
          // initialRoute: "/",
              ? ProductsOverviewScreen()
              : FutureBuilder(
                  future: auth.tryAutoLogin(),
                  builder: (ctx, authResultSnapshot) =>
                      authResultSnapshot.connectionState ==
                              ConnectionState.waiting
                          ? SplashScreen()
                          : AuthScreen(),
                ),
          routes: {
            // routes accepts an a Map<String, Function> where teh function creates an instance of the screen that should be rendered
            // in each screen, we define a static const property called routeName
            // static const routeName = "/products-overview"
            ProductDetailScreen.routeName: (ctx) => ProductDetailScreen(),
            CartScreen.routeName: (ctx) => CartScreen(),
            OrdersScreen.routeName: (ctx) => OrdersScreen(),
            UserProductsScreen.routeName: (ctx) => UserProductsScreen(),
            EditProductScreen.routeName: (ctx) => EditProductScreen(),
          },
        ),

// 5. Consumer()
Consumer<Orders>(
  // builder will run so long as notifylisteners() is called form within Orders
  builder: (ctx, orderData, child) => ListView.builder(
        itemCount: orderData.orders.length,
        itemBuilder: (ctx, i) => OrderItem(orderData.orders[i]),
      ),
);

// 6. FutureBuilder()
FutureBuilder(
  future: auth.tryAutoLogin(),
  // tryAutoLogin() is a method that returns a Future
  builder: (ctx, authResultSnapshot) =>
      authResultSnapshot.connectionState ==
              ConnectionState.waiting
              // while future takes time to resolve, we render a SplashScreen
          ? SplashScreen()
          : AuthScreen(),
          // When future resolves/updates, FutureBuilder automatically checks again, this time rendering AuthScreen()
),

// 7. Container and its properties
Container(
  margin: EdgeInsets.only(bottom: 20.0),
  padding:
      EdgeInsets.symmetric(vertical: 8.0, horizontal: 94.0),
  transform: Matrix4.rotationZ(-8 * pi / 180)
  // Rotates Container about the Z axis, which is into the plane of the screen
    ..translate(-10.0),
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(20),
    color: Colors.deepOrange.shade900,
    boxShadow: [
      BoxShadow(
        blurRadius: 8,
        color: Colors.black26,
        offset: Offset(0, 2),
      )
    ],
  ),
  child: Text(
    'MyShop',
    style: TextStyle(
      color: Theme.of(context).accentTextTheme.title.color,
      fontSize: 50,
      fontFamily: 'Anton',
      fontWeight: FontWeight.normal,
    ),
  ),
),

// 8. Animation
// Following example is for an auth screen, when the user switches between login mode and sign up mode.
// The confirm password field will fade/slide in
// --First initialize variables
AnimationController _controller;
Animation<Offset> _slideAnimation;
Animation<double> _opacityAnimation;

// --Declare values in initState()
@override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(
        milliseconds: 300,
      ),
    );
    _slideAnimation = Tween<Offset>(
      begin: Offset(0, -1.5),
      end: Offset(0, 0),
    ).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.fastOutSlowIn,
      ),
    );
    _opacityAnimation = Tween(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeIn,
      ),
    );
    // _heightAnimation.addListener(() => setState(() {}));
  }

// --Create a animation handler
void _switchAuthMode() {
  if (_authMode == AuthMode.Login) {
    setState(() {
      _authMode = AuthMode.Signup;
    });
    _controller.forward();
  } else {
    setState(() {
      _authMode = AuthMode.Login;
    });
    _controller.reverse();
  }
}

// --Use AnimatedContainer where the animation is relevant
AnimatedContainer(
  constraints: BoxConstraints(
    minHeight: _authMode == AuthMode.Signup ? 60 : 0,
    maxHeight: _authMode == AuthMode.Signup ? 120 : 0,
  ),
  duration: Duration(milliseconds: 300),
  curve: Curves.easeIn,
  child: FadeTransition(
    opacity: _opacityAnimation,
    child: SlideTransition(
      position: _slideAnimation,
      child: TextFormField(
        enabled: _authMode == AuthMode.Signup,
        decoration:
            InputDecoration(labelText: 'Confirm Password'),
        obscureText: true,
        validator: _authMode == AuthMode.Signup
            ? (value) {
                if (value != _passwordController.text) {
                  return 'Passwords do not match!';
                }
              }
            : null,
      ),
    ),
  ),
),

// --When listener triggers switchAuthMode() then animation begins

// 9. Form()

// create a global variable so we can access our form widget from outside build()
final GlobalKey<FormState> _formKey = GlobalKey();

// crate a method that submits the forms by calling validate() and save()
Future<void> _submit() async {
  if (!_formKey.currentState.validate()) {
    // Invalid!
    return;
  }
  _formKey.currentState.save();
  setState(() {
    _isLoading = true;
  });
  try {
    // Some method to login/sign up users
  } catch(error) {
    // ...
  }

// within build() create form widgets with TextFormFields()
Form(
  key: _formKey,
  child: SingleChildScrollView(
    child: Column(
      children: <Widget>[
        TextFormField(
          decoration: InputDecoration(labelText: 'E-Mail'),
          keyboardType: TextInputType.emailAddress,
          // validator function will run when Form.validate() is called
          validator: (value) {
            if (value.isEmpty || !value.contains('@')) {
              return 'Invalid email!';
            }
          },
          // onSaved function will run when Form.save() is called
          onSaved: (value) {
            _authData['email'] = value;
          },
        ),
      ],
    ),
  ),
)

// 10. TextEditingController and FocusNode()
// When we need the value of a field before calling .validate or .save? We use a TextEditingController
// The example below is for a field where we enter an imageUrl, and we want a preview image, when the field is not in focus.

// Add FocusNode and TextEditingController controllers
final _imageUrlFocusNode = FocusNode();
final _imageUrlController = TextEditingController();

// addListner to focusNode of relevance
void initState() {
  _imageUrlFocusNode.addListener(_updateImageUrl);
  // adds listner to our focusNode, so when hasFocus changes, _updateImageUrl will be called
  super.initState();
}

// add Handler
void _updateImageUrl() {
  if (!_imageUrlFocusNode.hasFocus) {
    if ((!_imageUrlController.text.startsWith('http') &&
            !_imageUrlController.text.startsWith('https')) ||
        (!_imageUrlController.text.endsWith('.png') &&
            !_imageUrlController.text.endsWith('.jpg') &&
            !_imageUrlController.text.endsWith('.jpeg'))) {
      return;
    }
    // calls setState() so that we can have a preview of chosen image
    setState(() {});
  }
}

// assign controllers
TextFormField(
  decoration: InputDecoration(labelText: 'Image URL'),
  keyboardType: TextInputType.url,
  textInputAction: TextInputAction.done,
  // must assign focusNode/textController
  controller: _imageUrlController,
  focusNode: _imageUrlFocusNode,
  validator: //..,
  onSaved: //..,
  onFieldSubmitted: (_) {
    // when user hits the bottom right submit/done button on soft keyboard, automatically go to next field
    FocusScope.of(context)
        .requestFocus(focusNodeOfNextField);
  },
  // saveForm();  alternatively if this is last field, you can automatically submit the form
),

// 11. PopupMenuButton
PopupMenuButton(
  // itemBuilder builds a number of PopUpMenuItem which each has a value
  // When that item is selected, that value is passed into onSelected function
  onSelected: (FilterOptions selectedValue) {
    setState(() {
      if (selectedValue == FilterOptions.Favorites) {
        _showOnlyFavorites = true;
      } else {
        _showOnlyFavorites = false;
      }
    });
  },
  icon: Icon(
    Icons.more_vert,
  ),
  itemBuilder: (_) => [
    PopupMenuItem(
      child: Text('Only Favorites'),
      value: FilterOptions.Favorites,
    ),
    PopupMenuItem(
      child: Text('Show All'),
      value: FilterOptions.All,
    ),
  ],
),

// 12. Spacer() and Chip()
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: <Widget>[
    Text(
      'Total',
      style: TextStyle(fontSize: 20),
    ),
    Spacer(),
    // takes up all available space, forcing items before and after it to extreme ends.
    Chip(
      // basically a highlighted
      label: Text(
        '\$${cart.totalAmount.toStringAsFixed(2)}',
        style: TextStyle(
          color: Theme.of(context).primaryTextTheme.title.color,
        ),
      ),
      backgroundColor: Theme.of(con text).primaryColor,
    ),
    OrderButton(cart: cart)
  ],
),

// 13. Dissmissable()
Dismissible(
  key: ValueKey(id),
  // prevents error by assigning key to each Dissmissable built from Listview.builder
  background: Container(
    // is the hidden background you see only when you swipe in the direction defined below(endToStart)
    color: Theme.of(context).errorColor,
    child: Icon(
      Icons.delete,
      color: Colors.white,
      size: 40,
    ),
    alignment: Alignment.centerRight,
    padding: EdgeInsets.only(right: 20),
    margin: EdgeInsets.symmetric(
      horizontal: 15,
      vertical: 4,
    ),
  ),
  direction: DismissDirection.endToStart,
  // confirmDismissed triggers onDismissed if the function returns true.
  confirmDismiss: (direction) {
    return showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
            title: Text('Are you sure?'),
            content: Text(
              'Do you want to remove the item from the cart?',
            ),
            actions: <Widget>[
              FlatButton(
                child: Text('No'),
                onPressed: () {
                  Navigator.of(ctx).pop(false);
                },
              ),
              FlatButton(
                child: Text('Yes'),
                onPressed: () {
                  Navigator.of(ctx).pop(true);
                },
              ),
            ],
          ),
    );
  },
  onDismissed: (direction) {
    Provider.of<Cart>(context, listen: false).removeItem(productId);
  },
  child: Card(...))

// 14. ListView.builder and ListTile
ListView.builder(
  itemCount: cart.items.length,
  itemBuilder: (ctx, i) => CartItem(
        cart.items.values.toList()[i].id,
        cart.items.keys.toList()[i],
        cart.items.values.toList()[i].price,
        cart.items.values.toList()[i].quantity,
        cart.items.values.toList()[i].title,
      ),
),

ListTile(
  leading: CircleAvatar(
    child: Padding(
      padding: EdgeInsets.all(5),
      child: FittedBox(
        child: Text('\$$price'),
      ),
    ),
  ),
  title: Text(title),
  subtitle: Text('Total: \$${(price * quantity)}'),
  trailing: Text('$quantity x'),
),

// 15. GestureDectector() with Hero(), CustomScrollView with slivers
GestureDetector(
  onTap: () {
    Navigator.of(context).pushNamed(
      ProductDetailScreen.routeName,
      arguments: product.id,
    );
  },
  child: Hero(
    // when two Hero widgets with same tags are navigated to/from another, the animation is triggered.
    tag: product.id,
    child: FadeInImage(
      placeholder: AssetImage('assets/images/product-placeholder.png'),
      image: NetworkImage(product.imageUrl),
      fit: BoxFit.cover,
    ),
  ),
),
// inside product detail screen,,
CustomScrollView(
  // we use CustomScrollView for the most configurability in a screen's scrolling. CustomScrollView works with slivers
  slivers: <Widget>[
    // in slivers, we usually have a single SliverAppBar followed by all other slivers such as SliverList(==listview) of SliverGrid(==gridview)
    SliverAppBar(
      expandedHeight: 300,
      // expandedHeight works handin hand with flexibleSpace, defines the height of fully expanded SliverAppBar
      pinned: true,
      // means that if you scroll past the SliverAppBar, it will still be pinned to the top, but displaying only title.
      flexibleSpace: FlexibleSpaceBar(
        title: Text(loadedProduct.title),
        background: Hero(
          tag: loadedProduct.id,
          child: Image.network(
            loadedProduct.imageUrl,
            fit: BoxFit.cover,
          ),
        ),
      ),
    ),
    SliverList(
      delegate: SliverChildListDelegate(
        // accepts a list of widgets as children, similar to a ListView with fixed children
        // there is also a builder version of this, check out docs to learn more
        [
          SizedBox(height: 10),
          Text(
            '\$${loadedProduct.price}',
            style: TextStyle(
              color: Colors.grey,
              fontSize: 20,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(
            height: 10,
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 10),
            width: double.infinity,
            child: Text(
              loadedProduct.description,
              textAlign: TextAlign.center,
              softWrap: true,
            ),
          ),
          SizedBox(height: 800,),
        ],
      ),
    ),
  ],
),

// 16. RefreshIndicator()
RefreshIndicator(
  onRefresh: () => _refreshProducts(context),
  child: Consumer<Products>(
    builder: (ctx, productsData, _) => Padding(
          padding: EdgeInsets.all(8),
          child: ListView.builder(
            itemCount: productsData.items.length,
            itemBuilder: (_, i) => Column(
                  children: [
                    UserProductItem(
                      productsData.items[i].id,
                      productsData.items[i].title,
                      productsData.items[i].imageUrl,
                    ),
                    Divider(),
                  ],
                ),
          ),
        ),
  ),
),

// ##### chatApp6

// 1. StreamBuilder
StreamBuilder(
  // Streambuilder is used for children that need to be rebuilt whenever something changes in a stream i.e. child depends on properties of the stream
  stream: FirebaseAuth.instance.onAuthStateChanged,
  // builder is run whenever stream changes, and we are given a snapsphot of the stream after it has changed
  // snapshots come in stages e.g.
  // new AsyncSnapshot<int>.withData(ConnectionState.none, 5)
  // new AsyncSnapshot<int>.withData(ConnectionState.waiting, 5)
  // each one one results in rebuilding, hence the tests for if we have are done with changes to configuration or not
  builder: (ctx, userSnapshot) {
    if (userSnapshot.connectionState == ConnectionState.waiting) {
      return SplashScreen();
    }
    if (userSnapshot.hasData) {
      return ChatScreen();
    }
    return AuthScreen();
  },
),

// ##### FieldWorks
RichText(
  // The RichText widget displays text that uses multiple different styles. The text to display is described using a tree of TextSpan objects, each of which has an associated style that is used for that subtree.
  // The text might break across multiple lines or might all be displayed on the same line depending on the layout constraints.
  text: TextSpan(
    children: [
      TextSpan(
          text: "FIELDWORKS",
          style: Theme.of(context).textTheme.headline4)
    ],
  ),
)

Material(
  borderRadius: BorderRadius.circular(7.0),
  elevation: 4.0,
  // Elevation gives the Container a hover effect with shadow,
  // Containers do not have elevation property. Wrapping it in Material allows so
  child: Container(
    height: 125.0,
    width: double.infinity,
    decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(7.0), color: Colors.white),),)
