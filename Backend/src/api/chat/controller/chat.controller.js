import {
  createConversationService,
  getRecentConversationRows,
} from "../service/chat.service.js";

// handle post request to create a new conversation
export async function createConversationController(req, res) {
  try {
    const { question } = req.body;
    // console.log(question);
    const result = await createConversationService(question);
    res.status(201).json({
      success: true,
      message: "conversation posted successfully.",
      data: result,
    });
  } catch (error) {
    throw error;
  }
}

export async function getConversationsController(req, res) {
  try {
    const result = await getRecentConversationRows(100);
    res.status(200).json({
      success: true,
      message: "conversation fetched successfully",
      data: {
        conversations: result,
      },
    });
  } catch (error) {
    throw error;
  }
}
