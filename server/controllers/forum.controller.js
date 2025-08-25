const Topic = require('../models/forum.model');
const User = require('../models/user.model');

// Create a new topic
exports.createTopic = async (req, res) => {
  try {
    const { title, description, category} = req.body;
    
    const newTopic = new Topic({
      title,
      description,
      category,
      creator: req.user.id
    });
    
    await newTopic.save();
    
    res.status(201).json(newTopic);
  } catch (error) {
    console.error('Create topic error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all topics
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .sort({ updatedAt: -1 })
      .populate('creator', 'name avatar')
      .select('title description category creator createdAt updatedAt');
      //.select('title description category createdAt updatedAt');
    
    res.status(200).json(topics);
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single topic with messages
exports.getTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id)
      .populate('creator', 'name avatar')
      .populate('messages.sender', 'name avatar')
      .populate('replies.sender', 'name avatar');
    
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    
    res.status(200).json(topic);
  } catch (error) {
    console.error('Get topic error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a message to a topic
exports.addMessage = async (req, res) => {
  try {
    const { content } = req.body;
    
    // Extract mentions from content (e.g., @username)
    const mentionRegex = /@(\w+)/g;
    const mentionUsernames = content.match(mentionRegex) || [];
    
    // Get user IDs from mentions
    const mentions = [];
    for (const mention of mentionUsernames) {
      const username = mention.substring(1); // Remove @ symbol
      const user = await User.findOne({ name: username });
      if (user) {
        mentions.push(user._id);
      }
    }
    
    const topic = await Topic.findById(req.params.id);
    
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    
    const newMessage = {
      sender: req.user.id,
      content,
      mentions
    };
    
    topic.messages.push(newMessage);
    topic.updatedAt = Date.now();
    
    await topic.save();
    
    // Populate sender info before sending response
    const populatedTopic = await Topic.findById(req.params.id)
      .populate('messages.sender', 'name avatar');
    
    const addedMessage = populatedTopic.messages[populatedTopic.messages.length - 1];
    
    res.status(201).json(addedMessage);
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a reply to a topic
exports.addReply = async (req, res) => {
  try {
    const { content } = req.body;
    
    // Extract mentions from content (e.g., @username)
    const mentionRegex = /@(\w+)/g;
    const mentionUsernames = content.match(mentionRegex) || [];
    
    // Get user IDs from mentions
    const mentions = [];
    for (const mention of mentionUsernames) {
      const username = mention.substring(1); // Remove @ symbol
      const user = await User.findOne({ name: username });
      if (user) {
        mentions.push(user._id);
      }
    }
    
    const topic = await Topic.findById(req.params.id);
    
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    
    const newReply = {
      sender: req.user.id,
      content,
      mentions
    };
    
    topic.replies.push(newReply);
    topic.updatedAt = Date.now();
    
    await topic.save();
    
    // Populate sender info before sending response
    const populatedTopic = await Topic.findById(req.params.id)
      .populate('replies.sender', 'name avatar');
    
    const addedReply = populatedTopic.replies[populatedTopic.replies.length - 1];
    
    res.status(201).json(addedReply);
  } catch (error) {
    console.error('Add reply error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a topic (only creator or admin)
exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    
    // Check if user is creator or admin
    if (topic.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this topic' });
    }
    
    await Topic.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error('Delete topic error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};







